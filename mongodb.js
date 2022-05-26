const mongoose = require('mongoose');

async function createConnection() {
  try {
    return mongoose.connect('mongodb://localhost:27017/demo');
  } catch (error) {
    mongoose.createConnection('mongodb://localhost:27017/demo');
  }
}

module.exports = createConnection;
