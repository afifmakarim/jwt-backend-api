const User = require("../models/user.model");
const { ROLES } = require("../models/associations");
const { log_error, log_info } = require("../utils/logger");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      const response = {
        message: "Failed! Username is already in use!",
      };
      log_error(req.method, response);
      res.status(400).send(response);
      return;
    }

    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      const response = {
        message: "Failed! Email is already in use!",
      };
      log_error(req.method, response);
      res.status(400).send(response);

      return;
    }

    next();
  } catch (error) {
    log_error(req.method, error.message);
    console.log(`error ${error}`);
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        const response = {
          message: "Failed! Role does not exist = " + req.body.roles[i],
        };
        log_error(req.method, response);
        res.status(400).send(response);
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
