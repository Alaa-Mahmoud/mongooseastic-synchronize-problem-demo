const mongoose = require("mongoose");

async function createConnection() {
  return new Promise((resolve, reject) => {
    try {
      const connection = mongoose.connect("mongodb://localhost:27017/demo");
      mongoose.connection.on("connected", () => {
        console.log("Connection successful");
        resolve(connection);
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = createConnection;
