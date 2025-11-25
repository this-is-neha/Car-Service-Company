const joi = require('joi');
const WorkerDto = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    department: joi.string().required(),
    role: joi.string().required(),
    image: joi.string().required(),


})
module.exports = { WorkerDto }