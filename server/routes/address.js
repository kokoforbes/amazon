/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const Address = require('../models/address');
const verifyToken = require('../middlewares/verify-token');

// POST REQUESTß
router.post('/addresses', verifyToken, async (req, res) => {
  try {
    const address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliveryInstructions = req.body.deliveryInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();

    res.json({
      success: true,
      message: 'Successfully added address',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
