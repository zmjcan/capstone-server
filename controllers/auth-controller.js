const knex = require("knex")(require("../knexfile"));
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function postUser(req, res) {
  const { user_name, user_email, user_password } = req.body;

  if (!user_name || !user_email || !user_password) {
    return res.status(400).send("Fields are missing");
  }

  const encryptedPW = bcrypt.hashSync(user_password, 10);

  try {
    await knex("users").insert({
      user_name,
      user_email,
      user_password: encryptedPW,
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

  if (!user_email || !user_password) {
    return res.status(400).send("Fields are missing");
  }

  try {
    const user = await knex("users").where({ user_email }).first();

    if (!user) {
      return res.status(400).send("Email is not registered, try again");
    }

    const isMatch = bcrypt.compareSync(user_password, user.user_password);

    if (!isMatch) {
      return res.status(400).send("Either email or password is incorrect, try again");
    }

    const token = jwt.sign({ user_email: user.user_email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, userId: user.id });
  } catch (err) {
    res.status(401).send("Error logging in.");
  }
}

async function updateUser(req, res) {
  const { user_name, user_email, user_password } = req.body;
  const { userId } = req.params;

  if (!user_name || !user_email || !user_password) {
    return res.status(400).send("Fields are missing");
  }

  try {
    const encryptedPW = bcrypt.hashSync(user_password, 10);
    const updatedUser = {
      user_name,
      user_email,
      user_password: encryptedPW,
    };

    await knex("users").where("id", userId).update(updatedUser);
    const updatedUserData = await knex("users").where("id", userId).first();

    res.status(200).json(updatedUserData);
  } catch (err) {
    console.error(err.code);
    res.status(500).send("Server error: " + err.code);
  }
}

module.exports = {
  postUser,
  loginUser,
  updateUser,
};
