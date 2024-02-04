const jwt = require('jsonwebtoken'); // TOKEN
const { JWT_SECRET_KEY } = require('../config/token.config');

// TOKEN MIDDLEWARE
const verifyToken = (req, res, next) => {
  //console.log(req.headers.authorization); // TOKEN ********************
  if (req.headers.hasOwnProperty('authorization')) {
    let token = req.headers.authorization;
    console.log('JWT verify-->', jwt.verify(token, JWT_SECRET_KEY))
    let decoded = jwt.verify(token, JWT_SECRET_KEY);
    //console.log(decoded.iat);//time for token in ms
    // TODO: check if user exist in DB
    // if exist call next function
    // else return error
    next();
  } else {
    res
      .status(210)
      .send('No authorization token! You must login for create token.');
  }
};

module.exports = verifyToken;
