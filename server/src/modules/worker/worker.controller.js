const WorkerSvc = require('./worker.service')

class WorkerController {
    create = async (req, res) => {
        try {

            const result = WorkerSvc.transformdata(req)
            console.log("Transformed Data:", result)
            const data = await WorkerSvc.createWorker(result)
            console.log("Data created:", data)
            console.log(result)
            res.json({
                message: "Worker created successfully",
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
            const Worker = await WorkerSvc.getAll()
            res.json({
                message: "All Workers fetched successfully",
                data: Worker,
                meta: null
            })
        }
        catch (exception) {
            throw exception;
        }
    }

    WorkerOne = async (req, res) => {
        try {
            const Worker = req.params.worker
            const result = await WorkerSvc.getWorker({ _id: Worker })
            console.log(result)
            res.json({
                message: "Worker fetched successfully",
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
            const result = await WorkerSvc.deleteWorker(id)
            res.json({
                message: "Worker deleted successfully",
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

            const result = await WorkerSvc.updateWorker(id, data)
            res.json({
                message: "Worker updated successfully",
                data: result,
                meta: null
            })
        } catch (exception) {
            throw exception;
        }
    }
}

const WorkerCtrl = new WorkerController();
module.exports = WorkerCtrl;
