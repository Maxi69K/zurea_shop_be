const Mongoose = require('mongoose');

const productSchema = new Mongoose.Schema({
  imgUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  userId: {
    type: String,
  },
});

const ProductModel = Mongoose.model('products', productSchema);

module.exports = ProductModel;
