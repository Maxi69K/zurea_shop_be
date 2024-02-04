const express = require('express');
const UserRouter = express.Router();
const ProductModel = require('../models/product.model');
const UserModel = require('../models/user.model');
const verifyToken = require('../validation/tokenValidation');
const stripe = require('stripe'); // STRIPE for payment
const secretKey =
  'sk_test_51NewRxFhcIRDjc4CHlC1h7Jzx8NHQK0ZMxeM6T9eu2uhjpX1eLdmmgAdnlND0ZZSSh6Bz4aoxSZ5kV6IUWteLXN700yXkqcdi3';
const stripeObj = stripe(secretKey);

UserRouter.get('/products/:userId', verifyToken, (req, res) => {
  const { userId } = req.params;

  ProductModel.find({ userId })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(415).send(err);
    });
});

UserRouter.get('/activate-account/:userId', (req, res) => {
  let { userId } = req.params;
  try {
    UserModel.updateOne({ _id: userId }, { isActive: true })
      .then((data) => {
        res.send('OK');
      })
      .catch((error) => {
        console.log(error);
        res.status(410).send('Error while activating user.');
      });
  } catch (e) {
    res.status(410).send('Error while activating user.');
  }
});

UserRouter.get('/get-all', (req, res) => {
  UserModel.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(410).send(error);
    });
});

UserRouter.get('/:id', (req, res) => {
  let { id } = req.params;
  UserModel.find({
    _id: id,
  })
    .then((data) => {
      if (!data) {
        return res.status(209).send('no user');
      }
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(415).send(error);
    });
});

UserRouter.post('/init-payment', verifyToken, async (req, res) => {
  try {
    const payment = await stripeObj.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send(payment.client_secret);
  } catch (e) {
    res.status(431).send(e);
  }
});

module.exports = UserRouter;
