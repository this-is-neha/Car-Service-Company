const paymentModel = require('./payment.model')

class paymentService {
    transformdata = (req) => {
        const payload = req.body

        return ({
            claim: payload.claim,
            image: req.file ? req.file.filename : null

        });
    }

    createpayment = async (data) => {
        try {
            const result = new paymentModel(data)
            return await result.save()
        }
        catch (exception) {
            throw exception;
        }
    }
    getAll = async () => {
        try {
            const result = await paymentModel.find()
            return result
        }
        catch (exception) {
            throw exception;
        }
    }
  getpayment = async (payment) => {
   
    return await paymentModel.findById(payment);
}

    deletepayment = async (id) => {
        try {
            const result = await paymentModel.findByIdAndDelete(id)
            return result
        }
        catch (exception) {
            throw exception;
        }
    }
    updatepayment = async (id, data) => {
        try {
            const result = await paymentModel.findByIdAndUpdate(id, data, { new: true })
            return result
        }
        catch (exception) {
            throw exception;
        }
    }

}
const paymentSvc = new paymentService()
module.exports = paymentSvc