const { likeService } = require("../services");

const pushLike = async (req, res) => {
  const userId = req.foundUser.id;
  const postId = req.body.postId;

  await likeService.pushLike(userId, postId);

  res.status(200).json({ message: "LIKE_PUSHED" });
};

module.exports = { pushLike };
