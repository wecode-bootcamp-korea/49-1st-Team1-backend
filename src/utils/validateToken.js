const userDao = require("../models");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      const error = new Error("ACCESS_TOKEN_REQUIRED");
      error.status = 401;
      throw error;
    }

    const { id } = jwt.verify(accessToken, process.env.SECRET_KEY);

    const foundUser = await userDao.findById(id);

    if (!foundUser) {
      const error = new Error("USER_NOT_FOUND");
      error.status = 404;
      throw error;
    }

    req.foundUser = foundUser;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = validateToken;
