//Niko Icardo 8/9/21

const MongoClient = require("mongodb").MongoClient; // mongodb client class.

const url =
  "mongodb+srv://Niko:eKkVDD5ZQ44JsDn@cluster0.arfc1.mongodb.net/products_test?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url); // define which server we want to connect to.

  try {
    await client.connect(); // establish connection to server
    const db = client.db(); // Create a new Db instance sharing the current socket connections.
    const result = await db.collection("products").insertOne(newProduct); // collection(): access collection or create one if none exists, insertOne(): add a new document to the specified collection.
  } catch (error) {
    return res.json({ message: "Could not store data." });
  };
  client.close(); //close connection to db
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url); 

  let products; 
  try{
    await client.connect(); 
    const db = client.db(); 
    products = await db.collection("products").find().toArray(); // returns the cursor pointer to an array. 
  }catch(error){
    return res.json({ message: "Could not retrieve products." });
  }

  client.close(); 
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
