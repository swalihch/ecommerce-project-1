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
  // PVC DOORS
  {
    name: 'PVC Bathroom Door Standard',
    category: 'Door',
    price: 5500,
    discount: 10,
    stock: 25,
    unit: 'piece',
    description: 'Affordable PVC bathroom door with waterproof design',
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1'
  },
  {
    name: 'PVC Printed Door',
    category: 'Door',
    price: 6500,
    discount: 15,
    stock: 18,
    unit: 'piece',
    description: 'Stylish printed PVC door with modern patterns',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
  },
  {
    name: 'PVC Solid Panel Door',
    category: 'Door',
    price: 7200,
    discount: 12,
    stock: 12,
    unit: 'piece',
    description: 'Strong solid panel PVC door for long durability',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea'
  },
  {
    name: 'PVC Glass Design Door',
    category: 'Door',
    price: 8000,
    discount: 18,
    stock: 10,
    unit: 'piece',
    description: 'PVC door with decorative glass insert',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511'
  },
  {
    name: 'PVC Double Door',
    category: 'Door',
    price: 12000,
    discount: 20,
    stock: 6,
    unit: 'piece',
    description: 'Wide PVC double door for main entrance',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
  },
  {
    name: 'PVC Sliding Door',
    category: 'Door',
    price: 9000,
    discount: 17,
    stock: 9,
    unit: 'piece',
    description: 'Smooth sliding PVC door for space saving',
    image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28'
  },

  // DOOR HANDLES
  {
    name: 'Stainless Steel Door Handle',
    category: 'Accessory',
    price: 900,
    discount: 5,
    stock: 40,
    unit: 'piece',
    description: 'Durable stainless steel handle for doors',
    image: 'https://images.unsplash.com/photo-1616627451527-7f7b6e2b8f4a'
  },
  {
    name: 'Aluminium Door Handle',
    category: 'Accessory',
    price: 700,
    discount: 8,
    stock: 35,
    unit: 'piece',
    description: 'Lightweight aluminium handle for all doors',
    image: 'https://images.unsplash.com/photo-1598300053653-dc44d3a63a56'
  },
  {
    name: 'Brass Designer Handle',
    category: 'Accessory',
    price: 1500,
    discount: 10,
    stock: 20,
    unit: 'piece',
    description: 'Premium brass designer handle for luxury doors',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a'
  },
  {
    name: 'Door Handle with Lock Set',
    category: 'Accessory',
    price: 1800,
    discount: 12,
    stock: 15,
    unit: 'piece',
    description: 'Complete door handle with integrated lock system',
    image: 'https://images.unsplash.com/photo-1582582429416-6c8b3c6c9b7b'
  },
  {
    name: 'Modern Pull Handle',
    category: 'Accessory',
    price: 1100,
    discount: 6,
    stock: 25,
    unit: 'piece',
    description: 'Modern long pull handle for glass and wooden doors',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f'
  },

  // HYLAM SHEETS
  {
    name: 'Hylam Sheet Brown',
    category: 'Sheet',
    price: 3000,
    discount: 10,
    stock: 30,
    unit: 'piece',
    description: 'Durable brown hylam sheet for electrical insulation',
    image: 'https://images.unsplash.com/photo-1581091215367-59ab6bdbf2c1'
  },
  {
    name: 'Hylam Sheet Industrial Grade',
    category: 'Sheet',
    price: 4200,
    discount: 12,
    stock: 20,
    unit: 'piece',
    description: 'Heavy duty industrial hylam sheet',
    image: 'https://images.unsplash.com/photo-1581091012184-5c2c4d9e8c14'
  },
  {
    name: 'Hylam Sheet High Pressure',
    category: 'Sheet',
    price: 5000,
    discount: 15,
    stock: 18,
    unit: 'piece',
    description: 'High pressure resistant hylam sheet',
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c'
  },

  // ACP SHEETS
  {
    name: 'ACP Sheet White Glossy',
    category: 'Sheet',
    price: 3500,
    discount: 8,
    stock: 28,
    unit: 'piece',
    description: 'Glossy white ACP sheet for exterior cladding',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e'
  },
  {
    name: 'ACP Sheet Wooden Finish',
    category: 'Sheet',
    price: 4000,
    discount: 10,
    stock: 22,
    unit: 'piece',
    description: 'Wooden texture ACP sheet for modern design',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e'
  },
  {
    name: 'ACP Sheet Matte Black',
    category: 'Sheet',
    price: 3800,
    discount: 9,
    stock: 24,
    unit: 'piece',
    description: 'Matte black ACP sheet for premium look',
    image: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97'
  },
  {
    name: 'ACP Sheet Exterior Grade',
    category: 'Sheet',
    price: 4500,
    discount: 11,
    stock: 15,
    unit: 'piece',
    description: 'Weather resistant ACP sheet for outdoor use',
    image: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd06'
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
