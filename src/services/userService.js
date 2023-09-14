const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  phoneNumberMinimumLength,
  birthdayRegExp
} = require ('../utils/userValidatingRules')
const { userDao } = require("../models");

const signUp = async (nickname, email, password, phoneNumber, birthday, profileImage) => {
  const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!emailRegExp.test(email)) {
    const error = new Error("INVALID_EMAIL_ADDRESS");
    error.status = 400;
    throw error;
  }

  const existingUser = await userDao.findUserByEmail(email);
  if (existingUser) {
    const error = new Error("DUPLICATED_EMAIL_ADDRESS");
    error.status = 400;
    throw error;
  }

  const passwordMinimumLength = 10;
  if (password.length < passwordMinimumLength) {
    const error = new Error("INVALID_PASSWORD");
    error.status = 400;
    throw error;
  }

  if (phoneNumber && phoneNumber.length < phoneNumberMinimumLength) {
    const error = new Error("INVALID_PHONE_NUMBER");
    error.status = 400;
    throw error;
  }

  if (birthday && !birthdayRegExp.test(birthday)) {
    const error = new Error("INVALID_BIRTHDAY");
    error.status = 400;
    throw error;
  }

  const encryptedPw = await bcrypt.hash(password, 10);

  await userDao.createUser(nickname, email, encryptedPw, phoneNumber, birthday, profileImage);
};

const signIn = async (email, password) => {
  const existingUser = await userDao.findUserByEmail(email);
  if (!existingUser) {
    const error = new Error("ACCOUNT_DOES_NOT_EXIST");
    error.status = 404;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, existingUser.password);
  if (!isMatched) {
    const error = new Error("PASSWORD_DOES_NOT_MATCH");
    error.status = 400;
    throw error;
  }

  return {
    accessToken: jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY),
    nickname: existingUser.nickname,
    profileImage: existingUser.profile_image,
  };
};

const findUser = async (userId) => {
  return await userDao.findUserById(userId);
};

module.exports = { signUp, signIn, findUser };
