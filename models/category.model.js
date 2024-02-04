const mongoose = require('mongoose');
//add fields
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },
  category_lower: {
    type: String,
  },
  categoryImg: {
    type: String,
  },
});

const CategoryModel = mongoose.model('categories', categorySchema);

module.exports = CategoryModel;
