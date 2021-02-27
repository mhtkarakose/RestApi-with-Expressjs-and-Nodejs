const mongoose = require("mongoose");
const config = require('../../config/config.js');

const DB_URI = config.db.development.url;

// set mongoose.Promise to native ES6 Promise implementation
mongoose.Promise = Promise;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    // useFindAndModify: false
});

// connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${DB_URI}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.connection.once('open', (err, data) => {
    console.log('Mongo working!');
});
