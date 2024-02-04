const createProductValidationMdw = (req, res, next) => {
  console.log(req?.body);
  res?.send('mdw');
};

const getProductValidator = (req, res, next) => {
  if (!req.params.productId) {
    return res.status(425).send('Not valid product id.');
    }
  next();
};

module.exports = {
  createProductValidationMdw,
  getProductValidator,
};
