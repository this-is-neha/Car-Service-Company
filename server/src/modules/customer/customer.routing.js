const express = require('express');
const router = express.Router();
const clientCtrl = require('./customer.controller');
router.post('/',clientCtrl.create);
router.get('/',clientCtrl.all);
router.get('/:client',clientCtrl.CustomerOne);
router.delete('/:id',clientCtrl.delete);  
router.put('/:id',clientCtrl.update); 
router.post('/login',clientCtrl.login) 


module.exports = router;