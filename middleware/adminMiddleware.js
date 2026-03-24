const User = require("../models/userModel");

const isAdmin = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.userId);

    if (!user || user.role !== "admin") {
      return res.redirect("/");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;