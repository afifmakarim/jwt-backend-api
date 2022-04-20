const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/auth.config");

const { TokenExpiredError } = jwt;

const catchError = (err, res, req) => {
  if (err instanceof TokenExpiredError) {
    const response = { message: "Unauthorized! Access Token was expired!" };
    log_error(req.method, response);
    return res.status(401).send(response);
  }

  const response = { message: "Unauthorized!" };
  log_error(req.method, response);
  return res.sendStatus(401).send(response);
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    const response = { message: "No token provided!" };
    log_error(req.method, response);
    return res.status(403).send(response);
  }

  jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    const response = {
      message: "Require Admin Role!",
    };
    log_error(req.method, response);
    res.status(403).send(response);
    return;
  } catch (error) {
    log_error(req.method, error.message);
    console.log(`error ${error}`);
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }
    const response = {
      message: "Require Moderator Role!",
    };
    log_error(req.method, response);
    res.status(403).send(response);
  } catch (error) {
    log_error(req.method, error.message);
    console.log(`error ${error}`);
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
  } catch (error) {
    log_error(req.method, error.message);
    console.log(`error ${error}`);
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
