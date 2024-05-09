const express = require("express");
const product = express.Router();
const productModel = require("../models/product");
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config();

//get di tutti i prodotti
product.get("/", async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  try {
    const products = await productModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    const totalProducts = await productModel.countDocuments();

    res.status(200).send({
      products,
      currentPage: +page,
      totalPages: Math.ceil(totalProducts / pageSize),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      statusCode: 500,
      message: "Errore nel recuperare i prodotti",
    });
  }
});

//get dei prodotti filtrati
product.get("/filter", async (req, res) => {
  const { page = 1, pageSize = 5, searchTerm = "", category = "" } = req.query;
  const query = {};

  if (searchTerm) {
    query.title = new RegExp(searchTerm, "i");
  }

  if (category) {
    query.category = category;
  }

  try {
    const products = await productModel
      .find(query)
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    const totalProducts = await productModel.countDocuments(query);

    res.status(200).send({
      products,
      currentPage: +page,
      totalPages: Math.ceil(totalProducts / pageSize),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      statusCode: 500,
      message: "Errore nel recuperare i prodotti",
    });
  }
});

//get di uno specifico prodotto
product.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "This request product doesn t exist",
      });
    }
    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      statusCode: 500,
      message: "Errore nel recuperare i prodotti",
    });
  }
});

//post di un nuovo prodotto
product.post("/", async (req, res) => {
  const newProduct = new productModel({
    image: req.body.image,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  });
  try {
    const productToSave = await newProduct.save();
    res.status(201).send({
      statusCode: 201,
      payload: productToSave,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

//patch di uno specifico prodotto
product.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request product doesn t exist!",
      });
    }

    const updatedData = req.body;
    const options = { new: true };

    const result = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

//delete di uno specifico utente
product.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).send({
        statusCode: 404,
        message: "The request product doesn t exist!",
      });
    }
    res.status(200).send(`product with id ${id} succesfully removed`);
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

//cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "PRODUCTS",
    public_id: (req, file) => file.name,
  },
});

const cloudUpload = multer({ storage: cloudStorage });

product.post(
  "/cloudUploadImg",
  cloudUpload.single("uploadImg"),
  async (req, res) => {
    try {
      res.status(200).json({ source: req.file.path });
    } catch (error) {
      res.status(500).send({
        statusCode: 200,
        message: "Internal server error",
      });
    }
  }
);

module.exports = product;
