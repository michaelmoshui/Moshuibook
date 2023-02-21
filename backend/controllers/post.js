const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { text, images, user, background } = req.body;
    const validUser = req.user.id;
    if (validUser !== user.id) {
      console.log("reached here");
      return res
        .status(400)
        .json({ message: "Your are not authorized to post" });
    }
    const post = await new Post({
      text: text,
      images: images,
      user: user.id,
      background: background,
    }).save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
