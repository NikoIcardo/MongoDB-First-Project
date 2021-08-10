//Niko Icardo 8/9/21
const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {type: Number, required: true }
}); 

module.exports = mongoose.model('Product', productSchema); 
/*
specifying the document name will automatically specify the collection name as the document name in the following fashion. 
Document => documents. So above, the document is 'Product' and the collection will be 'products'.  
*/