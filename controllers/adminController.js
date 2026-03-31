const Product = require("../models/productModel");

const getAdminProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // products per page

    const search = req.query.search;

    let query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalProducts / limit);

    res.render("admin/adminProducts", {
      products,
      currentPage: page,
      totalPages,
      totalProducts, // ✅ THIS LINE
      search,
    });
  } catch (error) {
    console.error(error);
    res.send("Error loading admin products");
  }
};

const showAddProduct = (req, res) => {
  res.render("admin/addProduct");
};
const createProduct = async (req, res) => {
  try {
    const { name, category, price, discount, stock, image, description } =
      req.body;

    await Product.create({
      name,
      category,
      price,
      discount,
      stock,
      image,
      description,
    });

    res.redirect("/admin/products");
  } catch (error) {
    console.error(error);
    res.send("Error creating product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId);

    res.redirect("/admin/products");
  } catch (error) {
    console.error(error);
    res.send("Error deleting product");
  }
};

const showEditProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();

    res.render("admin/editProduct", {
      product,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const { name, category, price, discount, stock, image, description } =
      req.body;

    await Product.findByIdAndUpdate(productId, {
      name,
      category,
      price,
      discount,
      stock,
      image,
      description,
    });

    res.redirect("/admin/products");
  } catch (error) {
    console.error(error);
    res.send("Error updating product");
  }
};

module.exports = {
  getAdminProducts,
  showAddProduct,
  createProduct,
  deleteProduct,
  showEditProduct,
  updateProduct,
};
