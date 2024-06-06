const knex = require("knex")(require("../knexfile"));

// GET /pets
async function getAllPets(req, res) {
  try {
    const data = await knex("pets");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving pets info: ${err}`);
  }
}

// POST /pets/
async function postOnePet(req, res) {
  // console.log(req.files); // the uploaded file object
  // console.log(req.files); // the uploaded file object
  // let file = req.files;  // here is the field name of the form


  if (
    !req.body ||
    !req.body.pet_name ||
    !req.body.pet_location ||
    !req.body.owner_name ||
    !req.body.owner_contact ||
    !req.body.pet_type ||
    !req.body.pet_image ||
    !req.body.pet_imgalt
  )  
  {
    return res.status(400).send("Fields are missing");
  }
  try {
    const newId = await knex("pets").insert(req.body);
    const newPet = await knex("pets").where("id", newId[0]).first();
    return res.status(201).json(newPet);
  } catch (err) {
    return res.status(500).send(`Error posting warehouse: ${err}`);
  }
}

// GET /pets/:petId
async function getOnePet(req, res) {
  const { petId } = req.params;

  try {
    const data = await knex("pets").where("id", petId).first();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving warehouses: ${err}`);
  }
}

// PATCH /pets/:petId

async function updateOnePet(req, res) {
  if (
    !req.body ||
    !req.body.pet_name ||
    !req.body.pet_location ||
    !req.body.finder_name ||
    !req.body.finder_contact
  ) {
    return res.status(400).send("Fields are missing");
  }

  try {
    const { petId } = req.params;
    const updatedPet = {
      pet_location: req.body.pet_location,
      finder_name: req.body.finder_name,
      finder_contact: req.body.finder_contact,
    };

    await knex("Pets").where("id", petId).update(updatedPet);
    const updatedPetData = await knex("Pets").where("id", petId).first();

    res.status(200).json(updatedPetData);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

// POST /pets/upload/


async function uploadImg(req, res) {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/assets/images/${file.name}`, (err) => {
    // file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {

    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
}

module.exports = {
  getAllPets,
  getOnePet,
  updateOnePet,
  postOnePet,
  uploadImg
};
