require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Product = require("../models/productModel");

console.log(process.env.MONGO_URI);

const products = [
  {
    name: "PVC Bathroom Door Premium",
    category: "Door",
    price: 7000,
    discount: 20,
    stock: 20,
    description: "High quality PVC bathroom door",
    image: "https://assets.bldnxt.in/catalog/product/cache/1/image/a77c1558d860704591e3027d1ebed402/_/p/_plnt835236a_5f2a223608f47.png"
  },
  {
    name: "Steel Sheet Heavy Duty",
    category: "Sheet",
    price: 4500,
    discount: 10,
    stock: 20,
    description: "Industrial grade steel sheet",
    image: "https://via.placeholder.com/300"
  },
  {
    name: "Door Handle Set",
    category: "Accessory",
    price: 1200,
    discount: 5,
    stock: 20,
    description: "Premium stainless door handle",
    image: "https://via.placeholder.com/300"
  }
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();