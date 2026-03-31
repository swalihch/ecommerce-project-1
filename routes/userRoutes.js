const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {getProfile} =require("../controllers/userController");

const {
  getHomepage,
  getSingleProduct,
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  checkout,
  getOrders,
  showCheckoutPage
} = require("../controllers/userController");

router.get("/", getHomepage);

router.get("/product/:id", getSingleProduct);

router.post("/add-to-cart/:id", addToCart);
router.get("/cart", getCart);

router.post("/remove-from-cart/:id", removeFromCart);
router.post("/update-cart/:id", updateCartQuantity);

router.post("/checkout", protect, checkout);
router.get("/orders", protect, getOrders);
router.get("/checkout", protect, showCheckoutPage);

router.get("/profile", protect,getProfile);

router.get("/order-success", (req,res)=>{
  res.render("user/orderSuccess");
});

module.exports = router;