const mongoose = require('mongoose');
const PaymentModel = new mongoose.Schema({
   claim:{
    type:String
   },
   image: {
    type:String
   },

   createdAt:{
    type:Date,
    default:Date.now
   },
   updatedAt:{
    type:Date,
    default:Date.now
   }
});

const Worker=mongoose.model('Payment',PaymentModel);
module.exports=Worker;