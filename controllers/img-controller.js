const cloudinary = require("cloudinary").v2;
const knex = require("knex")(require("../knexfile"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadImg(req, res) {
  //   const { pet_id } = req.params;
  //   const { user_id } = req.user;
  try {
    cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" });
        }
        try {
          await knex("Pets").insert({
            pet_id: pet_id,
            pet_image: result.secure_url,
          });
          return res.json(result);
        } catch (err) {
          console.log(err);
          return res.status(500).send("Error adding image to database.");
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error uploading image to Cloudinary" });
  }
}

async function getImg(req, res) {
  res.send({ title: "Uploading images to Cloudinary Console" });
}

module.exports = {
  uploadImg,
  getImg,
};
