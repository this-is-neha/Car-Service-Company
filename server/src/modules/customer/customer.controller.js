const CustomerSvc = require('./customer.service')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class CustomerController {
    create = async (req, res) => {
        try {
            const data = req.body
            const result = await CustomerSvc.createCustomer(data)
            console.log(result)
            res.json({
                message: "Customer created successfully",
                data: result,
                meta: null
            })
        }
        catch (exception) {
            console.log(exception)
            throw exception;
        }
    };




    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            console.log("Incomming request to login user", email);
            const userDetails = await CustomerSvc.getOne({ email: email });
            if (!userDetails) {
                throw ({
                    code: 422,
                    message: "User doesn`t exist",
                })
            }

            if (bcrypt.compareSync(password, userDetails.password)) {

                const accessToken = jwt.sign({
                    sub: userDetails._id,
                }, process.env.JWT_SECRET)

                const refreshToken = jwt.sign({
                    sub: userDetails._id,
                }, process.env.JWT_SECRET, { expiresIn: '7d' })

                res.json({
                    reult: {
                        detail: userDetails,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                    message: "User logged in successfully",
                    meta: null
                })
                console.log("Logged in")
                console.log("UserId:", userDetails._id)
                console.log("User name:", userDetails.name)
                console.log("Access Token", accessToken)
                console.log("Refresh Token", refreshToken)


            }
            else {
                throw ({
                    code: 422,
                    message: "Credentials dont match",


                })
            }
        }
        catch (exception) {
            console.error("Error in login", exception)
            throw exception
        }

    }


    all = async (req, res) => {
        try {
            const Customer = await CustomerSvc.getAll()
            res.json({
                message: "All Customers fetched successfully",
                data: Customer,
                meta: null
            })
        }
        catch (exception) {
            throw exception;
        }
    }

    CustomerOne = async (req, res) => {
        try {
            const customer = req.params.client
            console.log("Id is ", customer)
            const result = await CustomerSvc.getCustomer(customer)
            console.log(result)
            res.json({
                message: "Customer fetched successfully",
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
            const result = await CustomerSvc.deleteCustomer(id)
            res.json({
                message: "Customer deleted successfully",
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
            console.log("Id is ", id)
            console.log("Data is ", req)
            const result = await CustomerSvc.updateCustomer(id, data)
            res.json({
                message: "Customer updated successfully",
                data: result,
                meta: null
            })
        } catch (exception) {
            throw exception;
        }
    }
}

const CustomerCtrl = new CustomerController();
module.exports = CustomerCtrl;
