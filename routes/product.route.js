const express = require('express');
const ProductModel = require('../models/product.model');
const productRoute = express.Router();
const productValidation = require('../validation/productValidation');
const verifyToken = require('../validation/tokenValidation'); // Verify Token

productRoute.get('/get/:productId', productValidation.getProductValidator, (req, res) => {
  //console.log(req.params);
  ProductModel.findOne({_id: req.params.productId})
    .then((products) => res.send(products))
    .catch(err => res.status(415).send(err));
});

productRoute.get('/get-all', (req, res) => {
  ProductModel.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(420).send('Error in DB.'));
});

// Random Product
productRoute.get('/random/:number', async (req, res) => {
  let count = await ProductModel.count({});

  //let randomProduct = Math.floor(Math.random() * count + 1);

  let query = {
    skip: 0, // Skips first enter a number (products in base)
    limit: parseInt(req.params.number), // Determines how many products will be displayed
    sort: { price: 1 }, // to sort the price with the highest value use sort: { price: -1 };
  };

  // To display all products use projection = null;
  // throw out some value and use it projection = { price: 0 }
  // To display certain values projection = { price: 1, title: 1, description: 1, rating: 0 } itc...
  let projection = { title: 1, description: 1, price: 1 };

  ProductModel.find({}, projection, query)
    .then((data) => {
      //console.log(data);
      res.send('ok');
    })
    .catch((err) => {
      //console.log(err);
      res.status(420).send('Error in DB.');
    });
});

// Top two product
productRoute.get('/topTwo', (req, res) => {
  let query = {
    limit: 2,
    sort: { rating: -1 },
  };

  let projection = null;

  ProductModel.find({}, projection, query)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(415).send(err);
    });
});

productRoute.post('/search', (req, res) => {
  //console.log(req.body);
  // $regex= find any title with searchParams
  // $options = 'i' case sensitive
  ProductModel.find({ title: { $regex: req.body.searchParams, $options: 'i' } })
    .then((data) => {
      //console.log(data);
      if (!data || !data.length) {
        return res.status(209).send('no results');
      }
      res.send(data);
    })
    .catch((err) => {
      //console.log(err);
      res.status(415).send('error on search.');
    });
});

productRoute.post(
  '/create',
  verifyToken, // verifyToken middleware for TOKEN ****************************************************
  (req, res, next) => {
    let body = req.body;
    if (!body.title || !body.description || !body.price || !body.userId) {
      return res.status(431).send('Not valid form.');
    }
    next();
  },
  async (req, res) => {
    console.log(req.body);
    try {
      const newProduct = await ProductModel.create(req.body);
      newProduct.save();
      return res.send('ok');
    } catch (error) {
      res.status(432).send(error);
    }
  }
);

productRoute.get('/category/:id', (req, res) => {
  
})

productRoute.put('/update', (req, res) => {
  // console.log(req.body);

  // res.send('ok');
  const body = req.body;
  const query = {_id: body._id}
  ProductModel.updateOne(query, body)
    .then((data) => {
      //console.log(data);
      res.send(data);
    })
    .catch((error) => {
      //console.log(error);
      return res.status(404).send('Error on update product.');
    })
})

module.exports = productRoute;
