const mongoose = require('mongoose');
const WorkerMOdel=new mongoose.Schema({
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
       role:{
        type:String,
        required:true
    },
    
    department:{
        type:String,
        required:true
    },
 
    image:
    {type:String},
createdAt:{
    type:Date,
    default:Date.now
}
,
updatedAt:{
    type:Date,
    default:Date.now
}
})
const Worker=mongoose.model('Worker',WorkerMOdel);
module.exports=Worker;