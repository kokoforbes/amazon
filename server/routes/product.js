const router = require('express').Router();
const Product = require('../models/product');

const upload = require('../middlewares/upload-photo');

// POST REQUEST - CREATE A NEW PRODUCT
router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    const product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      success: true,
      message: 'Successfully saved',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET REQUEST - GET ALL PRODUCTS
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET REQUEST - GET A SINGLE PRODUCT
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// PUT REQUEST - UPDATE A SINGLE PRODUCT
router.put('/products/:id', upload.single('photo'), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        price: req.body.price,
        category: req.body.categoryID,
        description: req.body.description,
        photo: req.file.location,
        owner: req.body.ownerID,
      },
    }, { upsert: true });

    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// DELETE REQUEST - DELETE A SINGLE PRODUCT
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      res.json({
        success: true,
        message: 'Product successfullly deleted',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
