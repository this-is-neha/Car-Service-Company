const express = require('express')
const mainRouter = express.Router()
const claim = require("../modules/claim/claim.routing")
const customer = require("../modules/customer/customer.routing")
const worker = require("../modules/worker/worker.routing")
const payment = require('../modules/payment/payment.routing')
mainRouter.get("/", (req, res) => {
    console.log("Welcome to the main route");

});

mainRouter.use("/claim", claim)
mainRouter.use("/client", customer)
mainRouter.use("/worker",worker )
mainRouter.use('/payment',payment)
module.exports = mainRouter;