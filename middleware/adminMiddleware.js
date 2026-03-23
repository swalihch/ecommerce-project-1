const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  if (req.session.user.role !== "admin") {
    return res.redirect("/");
  }
  next();
};

module.exports = isAdmin;



// if(req.session.user.role !=="admin"){
//   return res.send("Access denied. Admins only");
// }