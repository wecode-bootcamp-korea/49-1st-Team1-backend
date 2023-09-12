const userService = require("../services/userService");

const signUp = async (req, res) => {
  const {
    email,
    password,
    phoneNumber,
    birthday,
    profileImage = "https://file.notion.so/f/f/fc7a0770-8294-4680-9cb3-c81efe407127/b5f725e6-ab7c-44cc-ad87-1214e26017a9/Untitled.jpeg?id=9589c573-1bbb-48d7-a06b-a0502555d9cd&table=block&spaceId=fc7a0770-8294-4680-9cb3-c81efe407127&expirationTimestamp=1694498400000&signature=HaKy6Iu4eI1EDtDNukBMxEpac-uWJ7yl4E4vx147ODo&downloadName=Untitled.jpeg",
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
