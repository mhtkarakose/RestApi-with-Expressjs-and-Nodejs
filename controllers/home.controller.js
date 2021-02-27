const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');
const pino = require('pino');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

router.get("/", (req, res, next) => {
    logger.debug(' res.send');
    // req.log.info('something')
    res.send('Hello World! - get')
});

router.post("/", body('email').isEmail(), (req, res, next) => {
    // body(req.body.email).isEmail();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('Hello World! - post')
});

router.get("/:id", (req, res, next) => {
    res.send('Hello World! - ' + req.params.id)
});


router.delete("/:id", (req, res, next) => {
    res.send('Hello World! - ' + req.params.id)
});

module.exports = router;
