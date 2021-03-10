const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const verifyToken = require('../middlewares/verify-token');

// signup route
router.post('/auth/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email or password' });
  } else {
    try {
      const newUser = new User();

      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      await newUser.save();

      const token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800, // 1 week
      });

      res.json({
        success: true,
        token,
        message: 'Successfully created a new user',
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
});

// profile route
router.get('/auth/user', verifyToken, async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.decoded._id });

    if (foundUser) {
      res.json({
        success: true,
        user: foundUser,
        message: 'User found successsfully',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// update profile route
router.put('/auth/user', verifyToken, async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.decoded._id });

    if (foundUser) {
      if (req.body.name) foundUser.name = req.body.name;
      if (req.body.email) foundUser.email = req.body.email;
      if (req.body.password) foundUser.password = req.body.password;

      await foundUser.save;
      res.json({
        success: true,
        message: 'Successsfully updated',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// login route
router.post('/auth/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) {
      res.status(403).json({
        success: false,
        message: 'Authentication failed, User not found',
      });
    } else if (foundUser.comparePassword(req.body.password)) {
      const token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800, // 1 week
      });
      res.json({
        success: true,
        token,
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Authtentication failed, wrong password',
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
