const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Uomo", "Donna"],
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("productModel", productSchema, "product");
