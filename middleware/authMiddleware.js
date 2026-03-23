// const protect = (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect("/login");
//   }
//   next();
// };

// const redirectIfLoggedIn = (req, res, next) => {
//   if (req.session.user.role === "admin") {
//     return res.redirect("/admin/dashboard");
//   }

//   return res.redirect("/");
//   next();
// };

// module.exports = {
//   protect,
//   redirectIfLoggedIn,
// };








const protect = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

const redirectIfLoggedIn = (req, res, next) => {

  // If user is logged in
  if (req.session.user) {

    // If admin
    if (req.session.user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }

    // Normal user
    return res.redirect("/");
  }

  // If not logged in
  next();
};

module.exports = {
  protect,
  redirectIfLoggedIn,
};