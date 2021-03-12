/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const axios = require('axios');
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

// GET REQUEST
router.get('/addresses', verifyToken, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      addresses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Edit single address
router.put('/addresses/:id', verifyToken, async (req, res) => {
  try {
    const foundAddress = await Address.findOne({ _id: req.decoded._id });

    if (foundAddress) {
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      // eslint-disable-next-line max-len
      if (req.body.deliveryInstructions) { foundAddress.deliveryInstructions = req.body.deliveryInstructions; }
      if (req.body.securityCode) foundAddress.securityCode = req.body.securityCode;

      await foundAddress.save();
    }

    res.json({
      success: true,
      message: 'Successfullly updated address',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete single address
router.delete('/addresses/:id', verifyToken, async (req, res) => {
  try {
    const deletedAddress = await Address.remove({ user: req.decoded._id, _id: req.params.id });

    if (deletedAddress) {
      res.json({
        success: true,
        message: 'Successfullly delted address',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET countries
router.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.eu/rest/v2/all');

    res.json({
      success: true,
      countries: response.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
