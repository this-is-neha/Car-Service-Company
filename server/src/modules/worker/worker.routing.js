const express = require('express');
const router = express.Router();
const workerCtrl = require('./worker.controller');
const upload=require('../../middlewware/upload')
router.post('/',upload.single('image'),workerCtrl.create);
router.get('/',workerCtrl.all);
router.get('/:worker',workerCtrl.WorkerOne );
router.delete('/:id',workerCtrl.delete);  
router.put('/:id',upload.single('image'),workerCtrl.update);  


module.exports = router;