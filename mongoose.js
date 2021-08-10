//Niko Icardo 8/9/21

const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://Niko:eKkVDD5ZQ44JsDn@cluster0.arfc1.mongodb.net/products_test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection has failed.");
  }); // this connection is now established and managed and is wrapped in a promise

const createProduct = async (req, res, next) => {
  const createProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createProduct.save();
  /* method provided by mongoose , connects to the database, 
  saves to the collection specified in the schema ('Product' => products),
  inserts document for us. Simplifies the process of adding documents in mongodb. 
  */
  res.json(result);
};

exports.createProduct = createProduct;
