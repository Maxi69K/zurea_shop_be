const Mongoose = require('mongoose');

// todo: add firstName, lastName, address, city, gender, isAdmin ...
const userSchema = new Mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true, //false
  },
});

const UserModel = Mongoose.model('users', userSchema);

module.exports = UserModel;

