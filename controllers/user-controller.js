const knex = require("knex")(require("../knexfile"));

// GET/users/

async function postOneUser(req, res) {
  if (
    !req.body ||
    !req.body.user_name ||
    !req.body.user_email ||
    !req.body.user_password
  ) {
    return res.status(400).send("Fields are missing");
  }
  try {
    const newUserId = await knex("users").insert(req.body);
    const newUser = await knex("users").where("id", newUserId[0]).first();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).send(`Error creating user: ${err}`);
  }
}

// GET/users/
async function getAllUsers(req, res) {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving user info: ${err}`);
  }
}

// GET/users/:userId

async function getOneUser(req, res) {
  const { userId } = req.params;

  try {
    const data = await knex("users").where("id", userId).first();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving warehouses: ${err}`);
  }
}

module.exports = {
  postOneUser,
  getAllUsers,
  getOneUser
};
