// const express = require('express');
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const {
//   getHomepage,
//   addProduct,
//   addToCart,
//   getCart,
//   getSingleProduct,
//   removeFromCart,
//   updateCartQuantity,
//   getAdminProducts,
//   showAddProduct,
//   createProduct,
//   deleteProduct,
//   showEditProduct,
//   updateProduct,
//   checkout,
//   getOrders
// } = require("../controllers/productController");
// const isAdmin = require("../middleware/adminMiddleware");



// router.get("/",getHomepage);
// router.get("/add-product",isAdmin,addProduct);
// router.post("/add-to-cart/:id",addToCart);
// router.get("/cart",getCart);
// router.get("/product/:id",getSingleProduct);
// router.post("/remove-from-cart/:id",removeFromCart);
// router.post("/update-cart/:id",updateCartQuantity);
// router.get("/admin/products",isAdmin,getAdminProducts);
// router.get("/admin/products/add", isAdmin, showAddProduct);
// router.post("/admin/products/add", isAdmin, createProduct);
// router.post("/admin/products/delete/:id", isAdmin, deleteProduct);
// router.get("/admin/products/edit/:id", isAdmin, showEditProduct);
// router.post("/admin/products/edit/:id", isAdmin, updateProduct);
// router.post("/checkout", protect, checkout);
// router.get("/orders", protect, getOrders);
// router.get("/order-success", (req,res)=>{
//   res.render("orderSuccess");
// });


// module.exports = router;
















// temporary product creation (for testing only);
// const addProduct = async (req, res) => {
//   try {
//     const existing = await Product.findOne({
//       name: "PVC Designer Glass Bathroom Door",
//     });
//     if (existing) {
//       return res.send("Product already exists");
//     }

//     const newProduct = new Product({
//       name: "PVC Designer Glass Bathroom Door",
//       category: "Door",
//       price: 7000,
//       discount: 20,
//       stock: 20, // ✅ add this
//       description: "High quality 38mm thick PVC designer bathroom door.",
//       image:
//         "https://assets.bldnxt.in/catalog/product/cache/1/image/a77c1558d860704591e3027d1ebed402/_/p/_plnt835236a_5f2a223608f47.png",
//     });

//     await newProduct.save();
//     res.send("Product added successfully");
//   } catch (error) {
//     console.error(error);
//     res.send("Error adding product");
//   }
// };