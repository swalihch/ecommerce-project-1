const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const { engine } = require("express-handlebars");

const connectDB = require("./config/db");

const errorHandler = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/userModel");

const app = express();

// connect Database;
connectDB();

/* body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* static files */
app.use(express.static(path.join(__dirname, "public")));

/* habdlebars setup */
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),

    helpers: {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      eq: (a, b) => a === b,
      gt: (a, b) => a > b,
      lt: (a, b) => a < b,

      ifEquals: (a, b, trueClass, falseClass) => {
        return a === b ? trueClass : falseClass;
      },

      range: function (start, end) {
        let arr = [];
        for (let i = start; i <= end; i++) {
          arr.push(i);
        }
        return arr;
      },
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

/* session config */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in production(HTTPS)
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

/* global variables */
app.use(async (req, res, next) => {
  try {
    if (req.session.userId) {
      const user = await User.findById(req.session.userId).lean();
      res.locals.user = user;
    } else {
      res.locals.user = null;
    }

    const cart = req.session.cart || [];
    res.locals.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    res.locals.cartPreview = cart;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

/* routes */
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
