const mongoose = require("mongoose");
const createConnection = require("./mongodb");
const createMany = require("./load");
const mongoosastic = require("mongoosastic");

const main = async () => {
  const connection = await createConnection();

  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    state: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    unitMeasure: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
    },
  });

  schema.plugin(mongoosastic, {
    index: "demo",
    bulk: {
      size: 1000, // preferred number of docs to bulk index
      delay: 100, //milliseconds to wait for enough docs to meet size constraint
    },
  });

  const Product = mongoose.model("Product", schema);
  for await (const doc of Product.find().cursor()) {
    const docToIndex = { name: doc.name };

    Product.bulkAdd({
      bulk: {
        size: 1000,
        delay: 100,
      },
      body: docToIndex,
      index: "demo",
      model: Product,
      id: doc._id.toString(),
    });
  }

  // const stream = Product.synchronize();

  // let count = 0;

  // stream.on("data", function (err, doc) {
  //   count++;
  // });

  // stream.on("close", function () {
  //   console.log("indexed " + count + " documents!");
  // });

  // stream.on("error", function (err) {
  //   console.log(err);
  // });
};

main().then((res) => console.log(res));
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
