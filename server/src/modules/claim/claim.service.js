const ClaimModel = require('./claim.model');

class ClaimService {

  createClaim = async (data) => {
    const result = new ClaimModel(data);
    return await result.save();
  };

 
  getAll = async () => {
    return await ClaimModel.find()
      .populate('assignedTo', 'name')
      .populate('clientName', 'name email');
  };


  getClaimById = async (id) => {
    return await ClaimModel.findById(id)
      .populate('assignedTo', 'name')
      .populate('clientName', 'name email');
  };

  
  getClaimsByUser = async (userId) => {
    return await ClaimModel.find({ clientName: userId })
      .populate('assignedTo', 'name')
      .populate('clientName', 'name email');
  };


  deleteClaim = async (id) => {
    return await ClaimModel.findByIdAndDelete(id);
  };


  updateClaim = async (id, data) => {
    return await ClaimModel.findByIdAndUpdate(id, data, { new: true });
  };
}

module.exports = new ClaimService();
