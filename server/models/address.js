const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  country: String,
  fullName: String,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: Number,
  phoneNumber: String,
  deliveryInstructions: String,
  securityCode: String,
});

module.exports = mongoose.model('Address', AddressSchema);
