/*
Niko Icardo 8/9/21
Note how simplistic the mongoose version is relative to the vanilla mongodb version. 
*/

const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://Niko:@cluster0.arfc1.mongodb.net/products_test?retryWrites=true&w=majority" // deleted the password from the URL for security reasons. 
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection has failed.");
  }); // this connection is now established and managed and is wrapped in a promise

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  console.log(createdProduct); // note that the id is already added to the object before saving it. This is a default feature by MongoDB. 

  const result = await createdProduct.save();
  /* 
  method provided by mongoose , connects to the database, 
  saves to the collection specified in the schema ('Product' => products),
  inserts document for us. Simplifies the process of adding documents in mongodb. 
  */
  //console.log(typeof createProduct.id);  automatically converts the object id into a string. 
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec(); 
  /*
  mongoose's find() method returns an array by default. You may turn it 
  into a cursor by adding the .cursor() method after find. 
  No promise is actually sent by default. Adding the .exec() method will add a promise. 
  */
 res.json(products); 
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
