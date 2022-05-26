// const createConnection = require('./mongodb');
// const createProducts = require('./load');



// async function main() {
//   const instance = await createConnection();
//   console.log('connected to db', instance);
//   const schema = new instance.Schema({
//     name: {
//       type: String,
//       required: true
//     },
//     state: {
//       type: Number,
//       default: 0
//     },
//     description: {
//       type: String,
//       default: ''
//     },
//     unitMeasure: {
//       type: Number,
//       required: true
//     },
//     productId: {
//       type: String
//     }
//   });
//   const productModel = instance.model('Product', schema);
//   console.log('model created');
//   await createProducts(productModel);
// }

// main().then(res => console.log('hello000', res));

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join('./data', 'products2.json'));
const products = JSON.parse(data);


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo');

const Product = mongoose.model('Product', {
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

console.log('Done parsing');

Product.insertMany(products).then(() => console.log('WORKS?!'))



