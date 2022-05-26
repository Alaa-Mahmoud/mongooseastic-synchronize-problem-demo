const fs = require('fs');
const path = require('path');

async function createMany(product) {
  const data = fs.readFileSync(path.join('./data', 'products.json'));
  const products = JSON.parse(data);
  const updatedProducts = products.map(p => {
    delete p._id
    return p;
  })

  await product.insertMany(updatedProducts);
}

module.exports = createMany;
