const express = require('express');
const singleProductRoute = express.Router();
const ProductModel = require('../models/product.model');

singleProductRoute.get('/:id', (req, res) => {
  let id = req.params.id;
  ProductModel.find({
    _id: id,
  })
    .then((data) => {
      if (!data) {
        res.status(209).send('no results');
      }
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(415).send("We don't have this product");
    });
});

module.exports = singleProductRoute;
