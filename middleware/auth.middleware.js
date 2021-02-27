const jwt = require("jsonwebtoken");
const config = require("../config/config")
const translate = require("../util/general/translate.util")

module.exports = function(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({message: translate(req.header.language, "token_not_found")});

    try {
        const decoded = jwt.verify(token, config.secretKey);
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: translate(req.header.language, "invalid_token")});
    }
};
