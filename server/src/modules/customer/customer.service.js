const CustomerModel = require('./customer.model')
const bcrypt = require('bcrypt');
class CustomerService {
    createCustomer = async (data) => {
        try {
            const result = new CustomerModel(data)
            result.password=bcrypt.hashSync(result.password,10);
            return await result.save()
        }
        catch (exception) {
            throw exception;
        }
    }
    getAll = async () => {
        try {
            const result = await CustomerModel.find()
            return result
        }
        catch (exception) {
            throw exception;
        }
    }
    getOne=async(customer)=>{
       try {
            const result = await CustomerModel.findOne(customer)
            console.log("Client DEtails",result)
            return result
        }
        catch (exception) {
            throw exception;
        }  
    }
    getCustomer = async (customer) => {
        try {
            const result = await CustomerModel.findById(customer)
            console.log("Client DEtails",result)
            return result
        }
        catch (exception) {
            throw exception;
        }
    }
  deleteCustomer = async (id) => {
    try {
        const customer = await CustomerModel.findById(id);
        if (!customer) throw new Error("Customer not found");

      
        await customer.deleteOne();

        return customer;
    } catch (exception) {
        throw exception;
    }
}

    updateCustomer = async (id, data) => {
        try {
            const result = await CustomerModel.findByIdAndUpdate(id, data, { new: true })
            return result
        }
        catch (exception) {
            throw exception;
        }
    }

}
const CustomerSvc = new CustomerService()
module.exports = CustomerSvc