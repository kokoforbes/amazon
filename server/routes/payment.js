const router = require('express').Router();
const moment = require('moment');
const stripe = require('stripe');
const verifyToken = require('../middlewares/verify-token');
const Order = require('../models/order');

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7,
  },

  fast: {
    price: 49.98,
    days: 3,
  },
};

function shipmentPrice(shipmentOption) {
  const estimated = moment().add(shipmentOption.days, 'd').format('ddd MMM Do');

  return { estimated, price: shipmentOption.price };
}

router.post('/shipment', (req, res) => {
  let shipment;

  if (req.body.shipment === 'normal') {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.fast);
  }

  res.json({
    success: true,
    shipment,
  });
});

router.post('/payment', verifyToken, (req, res) => {
  const totalPrice = Math.round(req.body.totalPrice * 100);

  stripe.customers.create({
    email: req.decoded.email,
  }).then((customer) => stripe.customers.createSource(customer.id, {
    source: 'tok_visa',
  })).then((source) => stripe.charges.create({
    amount: totalPrice,
    currency: 'usd',
    customer: source.customer,
  })).then(async (charge) => {
    const order = new Order();
    const { cart } = req.body;

    cart.map((product) => {
      order.products.push({
        productID: product._id,
        quantity: parseInt(product.quantity),
        price: product.price,
      });
    });

    order.owner = req.decoded._id;
    order.estimatedDelivery = req.body.estimatedDelivery;
    await order.save();
  })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

module.exports = router;
