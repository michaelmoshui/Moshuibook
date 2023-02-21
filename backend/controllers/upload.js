const cloudinary = require("cloudinary");
const fs = require("fs");
const eliminateNest = require("../helpers/eliminateNest");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { user } = req;
    const validUser = req.user.id;
    if (validUser != user.id) {
      return res
        .status(400)
        .json({ message: "Your are not authorized to upload images" });
    }
    const { path } = req.body; // path you wanna store pic in Cloudinary
    let files = eliminateNest(Object.values(req.files));
    let images = [];
    for (const file of files) {
      // upload function here!
      await cloudinary.v2.uploader
        .upload(file.tempFilePath, {
          resource_type: file.mimetype.split("/")[0],
          public_id: `${path}/${file.name}`,
          chunk_size: 1048576000,
        })
        .then((result) => {
          images.push(result.secure_url);
        });
      removeFile(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// remove file from tmp folder
function removeFile(path) {
  fs.unlink(path, (err) => {
    // unlink is a litttle bit faster than rm
    if (err) {
      console.log(err.message);
    }
  });
}
