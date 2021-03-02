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

// GET REQUEST - GET A SINGLE PRODUCT

// DELETE REQUEST - DELETE A SINGLE PRODUCT

module.exports = router;
