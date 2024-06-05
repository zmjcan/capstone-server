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
// async function postPets(req, res) {
  
// }

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




module.exports = {
  getAllPets,
  getOnePet
};
