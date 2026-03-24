const User = require("../models/userModel");

const protect = (req, res, next) => {
  // 🔥 prevent caching for protected pages
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  if (!req.session.userId) {
    return res.redirect("/login");
  }

  next();
};

const redirectIfLoggedIn = async (req, res, next) => {
  try {
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);

      if (!user) {
        req.session.destroy();
        return next();
      }

      if (user.role === "admin") {
        return res.redirect("/admin/dashboard");
      }

      return res.redirect("/");
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  protect,
  redirectIfLoggedIn,
};
