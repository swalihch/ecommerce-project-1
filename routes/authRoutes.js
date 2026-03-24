const express = require("express");
const router = express.Router();

const {protect,redirectIfLoggedIn} = require("../middleware/authMiddleware");
const {showRegister,register,showLogin,login,logout,} = require("../controllers/authController");
const {registerValidation, validate} = require("../middleware/validationMiddleware");

router.get("/register",redirectIfLoggedIn,showRegister);
router.post("/register",redirectIfLoggedIn,registerValidation,validate,register);

router.get("/login",redirectIfLoggedIn,showLogin);
router.post("/login",redirectIfLoggedIn,login);

router.get("/logout", protect, logout);


module.exports = router;