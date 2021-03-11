/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Review = require('../models/review');
const Product = require('../models/product');

const verifyToken = require('../middlewares/verify-token');
const upload = require('../middlewares/upload-photo');

// POST review
router.post('/reviews/:productID', [verifyToken, upload.single('photo')], async (req, res) => {
  try {
    const review = new Review();

    review.headline = req.body.headline;
    review.body = req.body.body;
    review.rating = req.body.rating;
    review.photo = req.file.location;
    review.productID = req.params.productID;
    review.user = req.decoded._id;

    //  update rating under proudct route
    await Product.update({ $push: review._id });

    const savedReview = await review.save();

    if (savedReview) {
      res.json({
        success: true,
        message: 'Successfully added review',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET review
router.get('/reviews/:productID', async (req, res) => {
  try {
    const productReviews = await Review.find({ productID: req.params.productID }).populate('user').exec();

    res.json({
      success: true,
      reviews: productReviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
