// large companies seed the products at first then go to the admin pannel and edit it form there... so that no need to add from the admin pannel directly... its so clean and easy


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected for seeding"))
  .catch((err) => console.log(err));

const products = [
  { name: "T-Shirt", price: 499, image: "tshirt.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Shoes", price: 1999, image: "shoes.jpg" ,description: "Comfortable cotton t-shirt"},
  { name: "Watch", price: 1499, image: "watch.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Backpack", price: 999, image: "bag.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Headphones", price: 2499, image: "headphones.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Sunglasses", price: 799, image: "sunglasses.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Jacket", price: 2999, image: "jacket.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Jeans", price: 1299, image: "jeans.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Cap", price: 399, image: "cap.jpg",description: "Comfortable cotton t-shirt" },
  { name: "Wallet", price: 699, image: "wallet.jpg",description: "Comfortable cotton t-shirt" },
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully 🌱");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();