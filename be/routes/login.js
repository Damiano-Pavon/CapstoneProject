const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

login.post("/", async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "this user not exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "unauthorized",
      });
    }
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,

        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res
      .header("Authorization", token)
      .status(200)
      .send({ message: "login succesful", statusCode: 200, token });
  } catch (e) {
    res.status(500).send({ message: "internal server error" });
  }
});

module.exports = login;
