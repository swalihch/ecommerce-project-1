const User = require("../models/userModel");

/* show register page */

const showRegister = (req, res) => {
  res.render("user/register", { isAuthPage: true });
};

/* Register */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("user/register", {
        error: "All fields are required",
        isAuthPage: true,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.render("user/register", {
        error: "Email already in use",
        isAuthPage: true,
      });
    }

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    // req.session.user = {
    //   id: newUser._id,
    //   role: newUser.role,
    //   name: newUser.name,
    //   email: newUser.email,
    // };
    req.session.userId = newUser._id;

    return res.redirect("/");
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.render("user/register", {
      error: "Registration failed",
      isAuthPage: true,
    });
  }
};

/* show login page */
const showLogin = (req, res) => {
  res.render("user/login", { isAuthPage: true });
};

/* login */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("user/login", {
        error: "Email and password required",
        isAuthPage: true,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!existingUser) {
      return res.render("user/login", {
        error: "Invalid credentials",
        isAuthPage: true,
      });
    }

    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch) {
      return res.render("user/login", {
        error: "Invalid credentials",
        isAuthPage: true,
      });
    }

    // req.session.user = {
    //   id: existingUser._id,
    //   role: existingUser.role,
    //   name: existingUser.name,
    //   email: existingUser.email,
    // };
    req.session.userId = existingUser._id;

    if (existingUser.role === "admin") {
      return res.redirect("/admin/dashboard");
    }

    return res.redirect("/");
  } catch (error) {
    return res.render("user/login", {
      error: "Login failed",
      isAuthPage: true,
    });
  }
};

/* logout */
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }

    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
};

module.exports = {
  showRegister,
  register,
  showLogin,
  login,
  logout,
};
