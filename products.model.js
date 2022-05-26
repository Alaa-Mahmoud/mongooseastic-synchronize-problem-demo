const mongoose = require('mongoose');
const mogooseastic = require('mongoosastic');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  unitMeasure: {
    type: Number,
    required: true
  },
  productId: {
    type: String
  }
});

schema.plugin(mogooseastic, { index: 'demo_products' });

const product = mongoose.model('Product', schema);

module.exports = product;
