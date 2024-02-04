const nodemailer = require('nodemailer');
const path = require('path');
const { MAIL_USER, MAIL_PASS } = require('../config/mail.config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com',
  // port: 587, // true for 465, false for other ports (587...)
  // secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const sendMail = function(email, subject, message) {
    let mailOptions = {
      from: `"Zurea shop 👻" ${MAIL_USER}`, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: message, // html body
      attachments: [
        {
          filename: 'logo.png',
          path: path.resolve(__dirname, '../public/img/zurea-logo.png'),
          cid: 'logo@nodemailer.com', //same cid value as in the html img src (If you are sending as an attachment, delete the cid)
        },
        {
          filename: 'logo.png',
          path: path.resolve(__dirname, '../public/img/zurea-logo.png'),
        },
      ],
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendMail;
