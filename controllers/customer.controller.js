const express = require("express");

const {check, validationResult} = require("express-validator");
const router = express.Router();
const pino = require('pino');

const auth = require("../middleware/auth.middleware");
const logger = pino({level: process.env.LOG_LEVEL || 'info'});

const translate = require("../util/general/translate.util")
const customerService = require("../services/customer.services");

router.get('/', (req, res) => {
    return res.status(200).json({payload: translate(req.header.language, "hello_customer")})
});

router.post("/signup",
    [
        check("username", "Please Enter a Valid Username").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({min: 6})
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()});
        }

        const {username, email, password} = req.body;
        try {
            const value = await customerService.signUp(req.header.language, username, email, password);

            return res.status(200).json({message: value});
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
);

router.post("/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({min: 6})
    ], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {email, password} = req.body;
        try {
            const value = await customerService.login(req.header.language, email, password);

            return res.status(200).json({message: value});

        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
);

router.get("/:id", [auth], async (req, res) => {
    try {
        console.log("BURADA")
        console.log(req.params.id)
        const value = await customerService.getById(req.header.language, req.params.id);

        return res.status(200).json({message: value});

    } catch (e) {
        return res.status(400).json({message: e.message});
    }
});

module.exports = router;
