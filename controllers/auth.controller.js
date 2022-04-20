const { log_error, log_info } = require("../utils/logger");
const { Role, RefreshToken, User } = require("../models/associations");
const config = require("../config/auth.config");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
      const response = { message: "User was registered successfully!" };

      log_info(req.method, response);
      res.send(response);
    } else {
      await user.setRoles([1]);
      const response = { message: "User was registered successfully!" };

      log_info(req.method, response);
      res.send(response);
    }
  } catch (error) {
    log_error(req.method, error.message);
    res.status(500).send({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      const response = { message: "User Not found." };
      log_error(req.method, response);
      return res.status(404).send(response);
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      const response = {
        accessToken: null,
        message: "Invalid Password!",
      };
      log_error(req.method, response);
      return res.status(401).send(response);
    }

    const token = jwt.sign({ id: user.id }, config.TOKEN_KEY, {
      expiresIn: config.jwtExpiration,
    });

    let refreshToken = await RefreshToken.createToken(user);

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    const response = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      refreshToken: refreshToken,
    };
    log_info(req.method, response);
    res.status(200).send(response);
  } catch (err) {
    log_error(req.method, err.message);
    res.status(500).send({ message: err.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    const response = { message: "Refresh Token is required!" };
    log_error(req.method, response);
    return res.status(403).json(response);
  }

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    console.log(refreshToken);

    if (!refreshToken) {
      const response = { message: "Refresh token is not in database!" };
      log_error(req.method, response);
      res.status(403).json();
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      const response = {
        message: "Refresh token was expired. Please make a new signin request",
      };
      log_error(req.method, response);
      res.status(403).json(response);
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.TOKEN_KEY, {
      expiresIn: config.jwtExpiration,
    });
    const response = {
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    };
    log_info(req.method, response);
    return res.status(200).json(response);
  } catch (err) {
    log_error(req.method, err.message);
    return res.status(500).send({ message: err });
  }
};

module.exports = { signup, signin, refreshToken };
