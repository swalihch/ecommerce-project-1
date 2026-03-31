const express = require("express");
const router = express.Router();

const isAdmin = require("../middleware/adminMiddleware");
const {protect} = require("../middleware/authMiddleware");

const {
  getAdminProducts,
  showAddProduct,
  createProduct,
  deleteProduct,
  showEditProduct,
  updateProduct,
} = require("../controllers/adminController");

router.get("/products", isAdmin, getAdminProducts);

router.get("/products/add", isAdmin, showAddProduct);
router.post("/products/add", isAdmin, createProduct);

router.get("/products/edit/:id", isAdmin, showEditProduct);
router.post("/products/edit/:id", isAdmin, updateProduct);

router.post("/products/delete/:id", isAdmin, deleteProduct);

router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.render("admin/dashboard", { isDashboard: true });
});

module.exports = router;
