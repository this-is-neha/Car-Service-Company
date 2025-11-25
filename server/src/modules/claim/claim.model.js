const mongoose = require('mongoose');
const LabourSchema = new mongoose.Schema({
    labourname: {
        type: String,
        default: ""
    },
    Rate: {
        type: Number,
        default: 0
    },
    Hours: {
        type: Number,
        default: 0
    },
    hourRate: {
        type: Number,
        default: 0
    },
    labourTax: {
        type: Number,
        default: 0
    }
});

const PartSchema = new mongoose.Schema({
  partNumber: String,
  partName: String,
  quantity: { type: Number, default: 1 },
  costPer: { type: Number, default: 0 },
  taxPercent: { type: Number, default: 0 }
});

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    partNumber: {
        type: Number,
        required: true
    },
  parts:[PartSchema],
    labour: [LabourSchema],
    total: {
        type: Number,
        default: 0
    }
});
const ServiceCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    subcategories: [SubCategorySchema]
});

const ClaimMOdel = new mongoose.Schema({
    claimnumber: {
        type: String,
        required: true,
        unique: true
    },
    repairno: {
        type: String,
        required: true,
        unique: true

    },
    currentODOMeter: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    clientName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        required: true
    }
    ,
    vehicleNo: {
        type: String,
        required: true,
        unique: true
    },


    statusAmounts: {
        Pending: { type: Number, default: 0 },
        Authorized: { type: Number, default: 0 },

    },

    sublets: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        costPer: {
            type: Number,
            required: true
        },
        requested: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Authorized', 'Paid'],
            default: 'Pending'
        },

    }],
    services: [ServiceCategorySchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Claim = mongoose.model('Claim', ClaimMOdel);
module.exports = Claim;