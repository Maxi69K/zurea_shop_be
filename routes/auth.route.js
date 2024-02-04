const express = require('express');
const UserModel = require('../models/user.model');
const authRoute = express.Router();
const userValidation = require('../validation/userValidation');
const sendMail = require('../services/mail.service');
const mailTemplates = require('../template/mail.template');
const jwt = require('jsonwebtoken'); // TOKEN
const { JWT_SECRET_KEY } = require('../config/token.config');

authRoute.get('/users', (req, res) => {
    UserModel.find({})
    .then((users) => {
        if (!users) {
            res.status(415).send('Bad credentials.');
        } else {
            res.status(200).send(users);
        }
    })
    .catch((err) => {
        //console.log(err);
        res.status(415).send(err);
    })
})

authRoute.get('/user/:id', (req, res) => {
    let userId = req.params.id;
    UserModel.find({_id: userId})
    .then((user) => {
        res.send(user);
    }).catch((err) => {
        res.send(err);
    })
});

authRoute.post('/login', (req, res) => {
  console.log('body...', req.body);
  if (!req.body.email || !req.body.password) {
    res
      .status(409)
      .send(`The ${!req.body.email ? 'email' : 'password'} field is required`);
  }

  UserModel.findOne(req.body)
    .then((data) => {
      console.log('data...', data);

      // if user not exists in DB
      if (!data) {
        return res.status(215).send('Bad credentials.');
      }
      if (!data.isActive) {
        return res.status(215).send('Not active user.')
      }

      // user exist in DB
      let token = jwt.sign({data}, JWT_SECRET_KEY); // TOKEN ******************************************************
      //console.log(token);
      data.password = null; // no send password
      res.status(200).send({user: data, token: token});
    })
    .catch((err) => {
      console.log(err);
      res.status(415).send(err);
    });
});

authRoute.post('/register', userValidation.registerValidation, async (req, res) => {
  console.log('REGISTER api call', req.body);
  try {
    const newUser = await UserModel.create(req.body);
  newUser.save();
  const activationMailHtml = mailTemplates.htmlActivation(`http://localhost/3000/activate-account/${newUser?._id}`);//Edit when you host

  sendMail(
    newUser?.email,
    'Activation Account',
    activationMailHtml
  )
    .then(() => res.send('User registered.'))
    .catch((error) => res.status(415).send(error));
  } catch (e) {
    res.status(416).send(`Error while creating new user: ${req.body.username}`);
  }
});

module.exports = authRoute;
