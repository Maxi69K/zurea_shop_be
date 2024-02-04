const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MONGO_DB_URL = require('./config/db.Config');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const mailRoute = require('./routes/mail.route');
const userRoute = require('./routes/user.route');
const app = express();
const portNumber = 5050;

mongoose.set('strictQuery', false)

// connect to mongo DB
mongoose.connect(MONGO_DB_URL)
    .then((data) => {
        console.log('Mongo DB is connected.');
    })
    .catch((err) => {
        console.log(err);
        console.log('Error while connecting to mongo DB.');
    })

// Communicate with external server
app.use(cors()); // Middleware
app.use(express.json());
app.use(express.static(__dirname + '/public')); // for attachment

// Routes
app.use('/api/auth', authRoute)
app.use('/api/product', productRoute);
app.use('/api/mail', mailRoute);
app.use('/api/user', userRoute);

app.listen(portNumber, err => {
    if (err) {
        console.log('---ERROR ON SERVER START---');
        console.log(err);
    } else {
        console.log(`Server is running on port: ${portNumber}`);
    }
})