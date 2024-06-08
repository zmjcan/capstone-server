const knex = require("knex")(require("../knexfile"));
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function postUser(req, res) {
  const { user_name, user_email, user_password } = req.body;
  // const encryptedPW = bcrypt.hashSync(user_password);

  if (
    !req.body ||
    !req.body.user_name ||
    !req.body.user_email ||
    !req.body.user_password
  ) {
    return res.status(400).send("Fields are missing");
  }

  try {
    await knex("users").insert({
      user_name,
      user_email,
      user_password,
      // user_password: encryptedPW,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err.code);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send("User already exists.");
    } else {
      res.status(500).send("Please try again");
    }
  }
}

async function loginUser(req, res) {
  const { user_email, user_password } = req.body;

  try {
    const user = await knex("users").where({ user_email }).first();

    if (!user) {
      return res.status(400).send("Email is not registered, try again");
    }

    // if (!bcrypt.compareSync(user_password, user.user_password)) {
    //   return res
    //     .status(400)
    //     .send("Either email or password is incorrect, try again");
    // }

    if (user_password === user.user_password) {
      const loginUserData = await knex("Users")
        .where("user_email", user_email)
        .first();

      return res.status(200).send(loginUserData);
    } else return res.status(401).send("Login failed.");

    // const token = jwt.sign(
    //   { user_email: user.user_email },
    //   process.env.JWT_SECRET
    // );
    // res.json({ token });

    // res.json(loginUserData);
  } catch (err) {
    res.status(401).send("Error login.");
  }
}

async function updateUser(req, res) {

  if (
    !req.body ||
    !req.body.user_name ||
    !req.body.user_email ||
    !req.body.user_password
  ) {
    return res.status(400).send("Fields are missing");
  }

  try {
    // const { user_name, user_email, user_password } = req.body;
    const { userId } = req.params;
      // const encryptedPW = bcrypt.hashSync(user_password);
    const updatedUser = {
      user_name: req.body.user_name,
      user_email:req.body.user_email,
      // user_password: encryptedPW,
      user_password:req.body.user_password,
    };
    await knex("Users").where("id", userId).update(updatedUser);
    const updatedUserData = await knex("Users").where("id", userId).first();

    res.status(200).json(updatedUserData);
  } catch (err) {
    console.error(err.code);
    res.status(500).send("Server error:" + err.code);
  }
}

module.exports = {
  postUser,
  loginUser,
  updateUser,
};
