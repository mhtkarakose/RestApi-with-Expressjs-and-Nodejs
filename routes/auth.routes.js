/**
 * Auth Routers
 */
const express = require('express');
const app = express.Router();
const localization = require("../middleware/localization.middleware");

app.all('/*', localization);
app.use("/", require('../controllers/customer.controller'));

module.exports = app;
