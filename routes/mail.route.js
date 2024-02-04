const express = require('express');
const mailRoute = express.Router();
const sendMail = require('../services/mail.service');
const { htmlContactForm } = require('../template/mail.template');

mailRoute.post('/sendContact', (req, res) => {

  const { email, subject, message } = req.body;

  let mailHtml = htmlContactForm(message);

  sendMail(email, subject, mailHtml)
    .then((result) => {
      // TODO: add in emails DB
      res.send(`mail ${result.messageId} is send`);
    })
    .catch((err) => {
      res.status(415).send(err);
    });

  // Link: https://nodemailer.com/about/
  //console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

});

module.exports = mailRoute;
