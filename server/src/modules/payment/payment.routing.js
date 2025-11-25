const express = require('express');
const router = express.Router();
const paymentCtrl = require('./payment.controller');
const upload=require('../../middlewware/upload')
router.post('/', upload.single('image'), paymentCtrl.create);

router.get('/all',paymentCtrl.all)
module.exports = router;