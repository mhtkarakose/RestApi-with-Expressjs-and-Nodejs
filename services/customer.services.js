const CustomerDM = require("../persistence/mongodb/models/customer.data");
const translate = require("../util/general/translate.util");
const config = require('../config/config');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    signUp, login, getById
};

async function signUp(lang, username, email, password) {
    try {
        // Check customer was there
        let existCustomer = await CustomerDM.findOne({email});

        if (existCustomer != null) {
            throw Error(translate(lang, 'customer_already_exists'));
        }

        let customer = new CustomerDM({
            username,
            email,
            password
        });

        customer.password = bcrypt.hashSync(password, 10);

        const tokenPayload = {
            user: {
                id: customer.id
            }
        };

        customer.token = generateAccessToken(tokenPayload);

        await customer.save();
        return customer.token;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

async function login(lang, email, password) {
    try {
        let customer = new CustomerDM;
        // customer = await CustomerDM.findOne({email});
        // console.log(customer);
        customer = await CustomerDM.findOne({email}).lean();
        console.log(customer);

        if (!customer || !bcrypt.compareSync(password, customer.password)) {
            throw Error(translate(lang, 'user_not_found'));
        }

        const tokenPayload = {
            user: {
                id: customer.id
            }
        };

        customer.token = generateAccessToken(tokenPayload);

        // await customer.save();
        return customer.token;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }

}

async function getById(lang, id) {
    try {
        let customer = await CustomerDM.findById(id).lean();
        if (!customer) {
            throw Error(translate(lang, 'user_not_found'));
        }
        return customer;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

function generateAccessToken(tokenPayload) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(tokenPayload, config.secretKey, {expiresIn: 10000});
}
