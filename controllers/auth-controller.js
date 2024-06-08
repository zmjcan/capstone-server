const knex = require("knex")(require("../knexfile"));
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function postUser(req, res) {
  const { user_name, user_email, user_password } = req.body;
    const encryptedPW = bcrypt.hashSync(user_password);

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
      // user_password,
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
  const {  user_email, user_password } = req.body;

  try {
    const user = await knex("users").where({ user_email }).first();

    if (!user) {
      return res.status(400).send("Email is not registered, try again");
    }

    if (!bcrypt.compareSync(user_password, user.user_password)) {
      return res.status(400).send("Either email or password is incorrect, try again");
    }

    if (user_password === user.user_password) {
      return res.status(200).send("Successfully logged-in!");
    } else return res.status(401).send("Login failed.");

    const token = jwt.sign({ user_email: user.user_email }, process.env.JWT_SECRET);
    res.json({ token });

  } catch (err) {
    res.status(401).send("Error login.");
  }
}

module.exports = {
  postUser,
  loginUser,
};
