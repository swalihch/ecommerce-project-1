const User = require("../models/userModel");

const getProfile = (req, res) => {
  res.render("user/profile", {
    user: res.locals.user,
  });
};

module.exports = {
  getProfile,
};
