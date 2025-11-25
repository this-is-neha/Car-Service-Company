const WorkerModel = require('./worker.model')

class WorkerService {
    transformdata = (req) => {
        const payload = req.body

        return ({
            name: payload.name,
            email: payload.email,
            role: payload.role,
            department: payload.department,
            image: req.file ? req.file.filename : null

        });
    }

    createWorker = async (data) => {
        try {
            const result = new WorkerModel(data)
            return await result.save()
        }
        catch (exception) {
            throw exception;
        }
    }
    getAll = async () => {
        try {
            const result = await WorkerModel.find()
            return result
        }
        catch (exception) {
            throw exception;
        }
    }
    getWorker = async (Worker) => {
        try {
            const result = await WorkerModel.findById(Worker)
            return result
        }
        catch (exception) {
            throw exception;
        }
    }
    deleteWorker = async (id) => {
        try {
            const result = await WorkerModel.findByIdAndDelete(id)
            return result
        }
        catch (exception) {
            throw exception;
        }
    }
    updateWorker = async (id, data) => {
        try {
            const result = await WorkerModel.findByIdAndUpdate(id, data, { new: true })
            return result
        }
        catch (exception) {
            throw exception;
        }
    }

}
const WorkerSvc = new WorkerService()
module.exports = WorkerSvc