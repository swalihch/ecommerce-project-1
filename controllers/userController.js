const User = require("../models/userModel");

const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// ✅ Homepage
const getHomepage = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "all";
    const page = parseInt(req.query.page) || 1;
    const limit = 8;

    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalProducts / limit);

    res.render("user/home", {
      products,
      search,
      category,
      currentUrl: req.originalUrl,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Cart + Orders
const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!req.session.cart) {
      req.session.cart = [];
    }

    const cart = req.session.cart;

    const quantity = parseInt(req.body.quantity) || 1;

    // 🔹 NEW — get product from DB
    const product = await Product.findById(productId);

    if (!product) {
      return res.json({ error: "Product not found" });
    }

    // 🔹 NEW — stock check
    if (product.stock === 0) {
      if (req.xhr || req.headers.accept?.includes("json")) {
        return res.json({ error: "Out of stock" });
      }

      return res.redirect(`/product/${productId}?error=outofstock`);
    }

    if (product.stock < quantity) {
      if (req.xhr || req.headers.accept?.includes("json")) {
        return res.json({
          error: `Only ${product.stock} item(s) left in stock`,
        });
      }

      return res.redirect(`/product/${productId}?error=stock`);
    }

    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
      // 🔹 check combined quantity
      if (existingItem.quantity + quantity > product.stock) {
        if (req.xhr || req.headers.accept?.includes("json")) {
          return res.json({ error: "Stock limit reached" });
        }

        return res.redirect(`/product/${productId}?error=stock`);
      }

      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (req.xhr || req.headers.accept?.includes("json")) {
      return res.json({ cartCount });
    }

    const redirectUrl = req.body.redirect || "/";
    res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    res.send("Error adding to cart");
  }
};

const getCart = async (req, res) => {
  try {
    const cart = req.session.cart || [];

    let cartItems = [];
    let total = 0;

    for (let item of cart) {
      const productData = await Product.findById(item.productId).lean();

      if (!productData) continue;

      let finalPrice = productData.price;

      if (productData.discount > 0) {
        finalPrice =
          productData.price - (productData.price * productData.discount) / 100;
      }

      const subtotal = finalPrice * item.quantity;

      total += subtotal;

      cartItems.push({
        product: productData,
        quantity: item.quantity,
        price: finalPrice,
        subtotal,
      });
    }

    res.render("user/cart", {
      layout: "main",
      cartItems,
      hasItems: cartItems.length > 0,
      total,
    });
  } catch (error) {
    console.error(error);
    res.send("Error loading cart");
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id).lean();

    let finalPrice = singleProduct.price;
    let savedAmount = 0;

    if (singleProduct.discount > 0) {
      finalPrice =
        singleProduct.price -
        (singleProduct.price * singleProduct.discount) / 100;
      savedAmount = singleProduct.price - finalPrice;
    }

    res.render("user/singleProduct", {
      singleProduct,
      finalPrice,
      savedAmount,
      error: req.query.error,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;

    req.session.cart = (req.session.cart || []).filter(
      (item) => item.productId !== productId,
    );

    let total = 0;

    for (let item of req.session.cart) {
      const product = await Product.findById(item.productId);

      let finalPrice = product.price;

      if (product.discount > 0) {
        finalPrice = product.price - (product.price * product.discount) / 100;
      }

      total += finalPrice * item.quantity;
    }

    const cartCount = req.session.cart.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    return res.json({
      cartCount,
      total,
    });
  } catch (error) {
    return res.json({ error: "Error removing item" });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const newQuantity = parseInt(req.body.quantity);

    if (!req.session.cart) {
      return res.json({ cartCount: 0 });
    }

    const item = req.session.cart.find((item) => item.productId === productId);

    if (!item) {
      return res.json({ error: "Item not found" });
    }

    // 🔥 GET PRODUCT FROM DB
    const product = await Product.findById(productId);

    if (!product) {
      return res.json({ error: "Product not found" });
    }

    // 🚨 STOCK CHECK
    if (newQuantity > product.stock) {
      return res.json({ error: "Stock limit reached" });
    }

    if (newQuantity <= 0) {
      req.session.cart = req.session.cart.filter(
        (item) => item.productId !== productId,
      );
    } else {
      item.quantity = newQuantity;
    }

    const cartCount = req.session.cart.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    return res.json({
      cartCount,
      newQuantity,
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Error updating quantity" });
  }
};

const showCheckoutPage = async (req, res) => {
  const cart = req.session.cart || [];

  let total = 0;
  let cartItems = [];

  for (let item of cart) {
    const product = await Product.findById(item.productId).lean();

    let finalPrice = product.price;

    if (product.discount > 0) {
      finalPrice = product.price - (product.price * product.discount) / 100;
    }

    total += finalPrice * item.quantity;

    cartItems.push({
      product,
      quantity: item.quantity,
      price: finalPrice,
    });
  }

  res.render("user/checkout", {
    cartItems,
    total,
  });
};

const checkout = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect("/cart");
    }

    let total = 0;
    let items = [];

    for (let item of cart) {
      const product = await Product.findById(item.productId);

      // 🚨 stock check
      if (!product || product.stock < item.quantity) {
        return res.send("Not enough stock available");
      }

      let finalPrice = product.price;

      if (product.discount > 0) {
        finalPrice = product.price - (product.price * product.discount) / 100;
      }

      total += finalPrice * item.quantity;

      items.push({
        product: product._id,
        quantity: item.quantity,
        price: finalPrice,
      });
    }

    // ✅ CREATE ORDER WITH NEW FIELDS
    await Order.create({
      user: req.session.userId,
      items,
      total,
      address,
      paymentMethod,
    });

    // 🔻 reduce stock
    for (let item of cart) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    req.session.cart = [];

    res.redirect("/order-success");
  } catch (error) {
    console.error(error);
    res.send("Checkout failed");
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.userId })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .lean();

    res.render("user/orders", {
      orders,
    });
  } catch (error) {
    console.error(error);
    res.send("Error loading orders");
  }
};

const getProfile = (req, res) => {
  res.render("user/profile", {
    user: res.locals.user,
  });
};

module.exports = {
  getHomepage,
  addToCart,
  getCart,
  getSingleProduct,
  removeFromCart,
  updateCartQuantity,
  showCheckoutPage,
  checkout,
  getOrders,
  getProfile,
};
