const joi=require('joi');
const ClaimDto=joi.object({
    claimnumber:joi.string().required(),
    repairno:joi.string().required(),
    currentODOMeter:joi.number().required(),
    type:joi.string().required(),
    date:joi.date().required(),
    clientName:joi.string().required(),
    assignedTo:joi.string().required(),
    vehicleno:joi.string().required(),
    status:joi.string().enum(['Pending','Authorized','Submitted','Paid']).required(),

})
module.exports={ClaimDto}