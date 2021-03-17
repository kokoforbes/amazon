const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  Owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
  products: [{
    productID: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
  }],
  estimatedDelivery: String,
});

module.exports = mongoose.model('Order', OrderSchema);
