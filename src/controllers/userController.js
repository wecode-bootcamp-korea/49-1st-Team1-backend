const userService = require("../services");

const signUp = async (req, res) => {
  const {
    email,
    password,
    phoneNumber,
    birthday,
    profileImage = "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffc7a0770-8294-4680-9cb3-c81efe407127%2Fb5f725e6-ab7c-44cc-ad87-1214e26017a9%2FUntitled.jpeg?table=block&id=9589c573-1bbb-48d7-a06b-a0502555d9cd&spaceId=fc7a0770-8294-4680-9cb3-c81efe407127&width=2000&userId=3389c2f0-8e40-4e50-a5a8-1876a4ee6b79&cache=v2",
  } = req.body;
  const nickname = req.body.nickname || email.substring(0, email.indexOf("@"));

  if (!email || !password) {
    const error = new Error("KEY_ERROR");
    error.status = 400;
    throw error;
  }

  await userService.signUp(nickname, email, password, phoneNumber, birthday, profileImage);

  res.status(201).json({ message: "USER_CREATED" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("KEY_ERROR");
    error.status = 400;
    throw error;
  }

  const token = await userService.signIn(email, password);

  res.status(200).json({
    message: "LOGIN_SUCCESS",
    accessToken: token,
  });
};

module.exports = { signUp, signIn };
