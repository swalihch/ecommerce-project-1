require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Product = require("../models/productModel");

console.log(process.env.MONGO_URI);

const products = [
  {
    name: 'PVC Bathroom Door Premium',
    category: 'Door',
    price: 7000,
    discount: 20,
    stock: 20,
    unit: 'piece',
    description: 'High quality PVC bathroom door',
    image: 'https://assets.bldnxt.in/catalog/product/cache/1/image/a77c1558d860704591e3027d1ebed402/_/p/_plnt835236a_5f2a223608f47.png'
  },
  {
    name: 'Steel Sheet Heavy Duty',
    category: 'Sheet',
    price: 4500,
    discount: 10,
    stock: 20,
    unit: 'piece',
    description: 'Industrial grade steel sheet',
    image: 'https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/20220317090756-e0972894-e96e-49a2-952d-f4970ceb13d7.jpg'
  },
  {
    name: 'Door Handle Set',
    category: 'Accessory',
    price: 1200,
    discount: 5,
    stock: 20,
    unit: 'piece',
    description: 'Premium stainless door handle',
    image: 'https://4.imimg.com/data4/KI/GN/MY-32172821/door-handle-lock-set.jpg'
  },
  {
    name: 'PVC Designer Glass Bathroom Door',
    category: 'Door',
    price: 7000,
    discount: 20,
    stock: 20,
    unit: 'piece',
    description: 'High quality 38mm thick PVC designer bathroom door.',
    image: 'https://assets.bldnxt.in/catalog/product/cache/1/image/a77c1558d860704591e3027d1ebed402/_/p/_plnt835236a_5f2a223608f47.png'
  },
  {
    name: 'door pvc',
    category: 'Door',
    price: 1100,
    discount: 2,
    stock: 20,
    unit: 'piece',
    description: 'doors with discount',
    image: 'https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/bathroom-pvc-door-20240430130029127.jpg'
  },
  {
    name: 'hyleom sheets',
    category: 'Sheet',
    price: 1500,
    discount: 1,
    stock: 20,
    unit: 'piece',
    description: 'best quality hyleom sheets',
    image: 'https://www.dial4trade.com/uploaded_files/product_images/thumbs/black-and-brown-hylam-sheet-org-1066644322771535837.jpg'
  },
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
