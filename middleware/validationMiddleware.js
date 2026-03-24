const { body, validationResult } = require("express-validator");

// ✅ REGISTER VALIDATION RULES
const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email").isEmail().withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// ✅ VALIDATION RESULT HANDLER
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("user/register", {
      error: errors.array()[0].msg,
      isAuthPage: true,
    });
  }

  next();
};

module.exports = {
  registerValidation,
  validate,
};
