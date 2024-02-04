const express = require('express');
const categoryRoute = express.Router();
const CategoryModel = require('../models/category.model');

categoryRoute.get('/rand', (req, res) => {
  // get 3 random category
  CategoryModel.aggregate([{ $sample: { size: 3 } }])
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      res.status(420).send(err);
    });
});

module.exports = categoryRoute;
