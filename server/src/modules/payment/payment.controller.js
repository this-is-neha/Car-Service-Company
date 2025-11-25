const paymentSvc = require('./payment.service')

class paymentController {
    create = async (req, res) => {
        try {

            const result = paymentSvc.transformdata(req)
            console.log("Transformed Data:", result)
            const data = await paymentSvc.createpayment(result)
            console.log("Data created:", data)
            console.log(result)
            res.json({
                message: "payment created successfully",
                data: data,
                meta: null
            })
        }
        catch (exception) {
            console.log(exception)
            throw exception;
        }
    };

    all = async (req, res) => {
        try {
            const payment = await paymentSvc.getAll()
            res.json({
                message: "All payments fetched successfully",
                data: payment,
                meta: null
            })
        }
        catch (exception) {
            throw exception;
        }
    }

    paymentOne = async (req, res) => {
        try {
            const payment = req.params.payment
            const result = await paymentSvc.getpayment({ _id: payment })
            console.log(result)
            res.json({
                message: "payment fetched successfully",
                data: result,
                meta: null
            })
        }
        catch (exception) {
            throw exception;
        }
    }
    delete = async (req, res) => {
        try {
            const id = req.params.id
            const result = await paymentSvc.deletepayment(id)
            res.json({
                message: "payment deleted successfully",
                data: result,
                meta: null
            })
        } catch (exception) {
            throw exception;
        }
    }
    update = async (req, res) => {
        try {
            const id = req.params.id
            const data = req.body

            if (req.file) {
                data.image = req.file.filename;
            }

            const result = await paymentSvc.updatepayment(id, data)
            res.json({
                message: "payment updated successfully",
                data: result,
                meta: null
            })
        } catch (exception) {
            throw exception;
        }
    }
}

const paymentCtrl = new paymentController();
module.exports = paymentCtrl;
