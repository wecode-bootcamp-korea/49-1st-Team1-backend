const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");

const signUp = async (nickname, email, password, phoneNumber, birthday, profileImage) => {
  const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!emailRegExp.test(email)) {
    const error = new Error("INVALID_EMAIL_ADDRESS");
    error.status = 400;
    throw error;
  }

  const existingUser = await userDao.findByEmail(email);
  if (existingUser) {
    const error = new Error("DUPLICATED_EMAIL_ADDRESS");
    error.status = 400;
    throw error;
  }

  if (password.length < 10) {
    const error = new Error("INVALID_PASSWORD");
    error.status = 400;
    throw error;
  }

  if (phoneNumber && phoneNumber.length < 11) {
    const error = new Error("INVALID_PHONE_NUMBER");
    error.status = 400;
    throw error;
  }

  const birthdayRegExp = /^\d{4}-\d{2}-\d{2}$/;
  if (birthday && !birthdayRegExp.test(birthday)) {
    const error = new Error("INVALID_BIRTHDAY");
    error.status = 400;
    throw error;
  }

  const encryptedPw = await bcrypt.hash(password, 2);

  await userDao.save(nickname, email, encryptedPw, phoneNumber, birthday, profileImage);
};

const signIn = async (email, password) => {
  if (!email || !password) {
    const error = new Error("KEY_ERROR");
    error.status = 400;
    throw error;
  }

  const existingUser = await userDao.findByEmail(email);
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

  return jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);
};

module.exports = { signUp, signIn };
