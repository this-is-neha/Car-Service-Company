const express = require('express');
const router = express.Router();
const ClaimCtrl = require('./claim.controller');
const authMiddleware=require('../../middlewware/authmiddleware')
router.post('/',ClaimCtrl.create);
router.get('/',ClaimCtrl.all);
router.get('/my', authMiddleware, ClaimCtrl.myclaim); 
router.get('/:claim', ClaimCtrl.claimOne);

router.delete('/:id',ClaimCtrl.delete);  
router.put('/:id',ClaimCtrl.update);  



module.exports = router;