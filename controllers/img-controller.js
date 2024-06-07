// const cloudinary = require("cloudinary").v2;
const knex = require("knex")(require("../knexfile"));

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

async function uploadImg(req, res) {
  console.log(req.files.file); // the uploaded file object

  const file = req.files.file;
  const uploadPath = process.cwd()+"/statics/" + file.name;

  file.mv(uploadPath, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(uploadPath);
    console.log(uploadPath)
  });

}

// async function getImg(req, res) {
//   res.send({ title: "Uploading images to Cloudinary Console" });
// }

module.exports = {
  uploadImg,
  // getImg,
};
