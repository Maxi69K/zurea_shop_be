const express = require('express');
const shopRoute = express.Router();
const ProductModel = require('../models/product.model');

// 10 random ads params slider at home
shopRoute.get('/:numberOfAds/:bestProduct', (req, res) => {
  let number = req.params.numberOfAds;
  let best = req.params.bestProduct;
  let query = null;
  if (best === 'best') {
    query = [{ $sort: { rating: -1, _id: 1 } }, { $limit: parseInt(number) }];
  } else if (best === 'randum') {
    query = [{ $sample: { size: parseInt(number) } }];
  } else {
    return res.status(415).send('error params');
  }
  ProductModel.aggregate(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(415).send(error);
    });
});

module.exports = shopRoute;
