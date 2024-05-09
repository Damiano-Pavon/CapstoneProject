const express = require("express");
const user = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const validateUserBody = require("../middlewares/validateUserBody");
const verifyToken = require("../middlewares/verifyToken");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// get di tutti gli utenti
user.get("/", verifyToken, async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      statusCode: 500,
      message: "Errore nel recuperare gli utenti",
    });
  }
});

//post di un nuovo utente
user.post("/", validateUserBody, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const userToSave = await newUser.save();
    const token = jwt.sign({ userId: userToSave._id }, "your_secret_key_here");
    res.status(201).send({
      statusCode: 201,
      payload: userToSave,
      token: token,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

//patch di uno specifico utente
user.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request user doesn t exist!",
      });
    }

    const updatedData = req.body;
    const options = { new: true };

    const result = await userModel.findByIdAndUpdate(id, updatedData, options);

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

//delete di uno specifico utente
user.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request user doesn t exist!",
      });
    }
    res.status(200).send(`user with id ${id} succesfully removed`);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = user;
