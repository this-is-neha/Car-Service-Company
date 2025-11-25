const joi = require('joi');
const CustomerDto = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).required(),
    confirm: joi.string().valid(joi.ref("password")).required(),
    phone: joi.number().required(),
    address: joi.string().required(),
    vehicleno: joi.string().required(),


})

module.exports = { CustomerDto }