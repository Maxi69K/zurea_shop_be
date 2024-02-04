const UserModel = require("../models/user.model");

const registerValidation = (req, res, next) => {
    let body = req.body;
    if (!body.email || !body.firstName || !body.lastName || !body.username || !body.password) {
        return res.status(412).send('Not valid form.');
    }
    UserModel.findOne({email: body.email})
        .then((data) => {
            if (!data) {
                return next();
            }
            return res.status(414).send(`User with email: ${body.email} already exist.`);
        })
        .catch((error) => {
            console.log(error);
            res.status(413).send('Error on searching user in DB.');
        });
}

module.exports = {registerValidation};