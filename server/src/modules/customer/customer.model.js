const mongoose = require('mongoose');
const claim =require('../claim/claim.model');
const CustomerMOdel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    confirm:{
      type:String,
        required:true
    },
   phone:{
        type:Number,
        required:true
    },    
    address:{
        type:String,
        required:true
    }, 
    vehicleNo:{
        type:String,
    required:true ,
    unique:true   
    },
 
createdAt:{
    type:Date,
    default:Date.now
}
})

CustomerMOdel.pre('deleteOne', async function(next) {
  await claim.deleteMany({ clientName: this._id });
  next();
});
const Customer=mongoose.model('Customer',CustomerMOdel);
module.exports=Customer;


