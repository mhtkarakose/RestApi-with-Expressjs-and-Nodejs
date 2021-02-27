const TR = require("../../localization/tr");
const EN = require("../../localization/en");
const LANGUAGE = require("../../util/enumaration/language.enum");

module.exports = function (lang, key) {
    if (lang == LANGUAGE.EN) {
        return EN[`${key}`];
    } else {
        return TR[`${key}`];
    }
};
