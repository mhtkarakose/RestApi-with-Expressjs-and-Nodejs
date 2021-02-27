/**
 * API Routers
 */
const express = require('express');
const app = express.Router();
const auth = require("../middleware/auth.middleware");
const localization = require("../middleware/localization.middleware");

app.all('/*', auth)
app.all('/*', localization)
app.get('/', (req, res) => res.send('Hello World! -v1'));
app.use("/home", require('../controllers/home.controller'));
// app.use("/customer", require('../controllers/customer.controller'));

module.exports = app;
