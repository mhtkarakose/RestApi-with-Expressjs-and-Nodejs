const language = require('../util/enumaration/language.enum')
const header = require('../util/enumaration/header.enum')
const translate = require("../util/general/translate.util")

module.exports = function(req, res, next) {
    try {
        const lang = req.header(header.LANGUAGE);
        if (!lang){
            req.header.language = language.TR;
        }
        req.header.language = lang;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: translate(req.header.language, "localization_bomb") });
    }
};
