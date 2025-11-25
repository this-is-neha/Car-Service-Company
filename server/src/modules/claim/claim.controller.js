// const ClaimSvc = require('./claim.service')
// const ClaimModel = require('./claim.model')
// class ClaimController {
//     create = async (req, res) => {
//         try {
//             const data = req.body
//             const result = await ClaimSvc.createClaim(data)
//             console.log(result)
//             res.json({
//                 message: "Claim created successfully",
//                 data: result,
//                 meta: null
//             })
//         }
//         catch (exception) {
//             console.log(exception)
//             throw exception;
//         }
//     };

//     all = async (req, res) => {
//         try {
//             const claim = await ClaimSvc.getAll()
//             res.json({
//                 message: "All claims fetched successfully",
//                 data: claim,
//                 meta: null
//             })
//         }
//         catch (exception) {
//             throw exception;
//         }
//     }
//    myclaim = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const claim = await ClaimSvc.getOneClaim({ clientName: userId });
//         res.json({ data: claim });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }

//     claimOne = async (req, res) => {
//         try {
//             const claim = req.params.claim
//             const result = await ClaimSvc.getClaim({ _id: claim })
//             console.log(result)
//             res.json({
//                 message: "Claim fetched successfully",
//                 data: result,
//                 meta: null
//             })
//         }
//         catch (exception) {
//             throw exception;
//         }
//     }
//     delete = async (req, res) => {
//         try {
//             const id = req.params.id
//             const result = await ClaimSvc.deleteClaim(id)
//             res.json({
//                 message: "Claim deleted successfully",
//                 data: result,
//                 meta: null
//             })
//         } catch (exception) {
//             throw exception;
//         }
//     }
//     update = async (req, res) => {
//         try {
//             const id = req.params.id
//             const data = req.body
//             const result = await ClaimSvc.updateClaim(id, data)
//             res.json({
//                 message: "Claim updated successfully",
//                 data: result,
//                 meta: null
//             })
//         } catch (exception) {
//             throw exception;
//         }
//     }
// }

// const ClaimCtrl = new ClaimController();
// module.exports = ClaimCtrl;



const ClaimSvc = require('./claim.service');

class ClaimController {
    // Create
    create = async (req, res) => {
        try {
            const data = req.body;
            const result = await ClaimSvc.createClaim(data);
            res.json({ message: "Claim created successfully", data: result, meta: null });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    all = async (req, res) => {
        try {
            const claims = await ClaimSvc.getAll();
            res.json({ message: "All claims fetched successfully", data: claims, meta: null });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    claimOne = async (req, res) => {
        try {
            const id = req.params.claim;
            console.log("Id is ", id)
            const claim = await ClaimSvc.getClaimById(id);
            if (!claim) return res.status(404).json({ message: "Claim not found" });
            res.json({ message: "Claim fetched successfully", data: claim, meta: null });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };


    myclaim = async (req, res) => {
        try {
            const userId = req.userId;
            console.log("User Id",userId)
            const claims = await ClaimSvc.getClaimsByUser(userId);
            console.log("Claioms",claims)
            res.json({
                data: claims,
                message: "Claim fetched ",
                metadata: null
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };


    delete = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await ClaimSvc.deleteClaim(id);
            res.json({ message: "Claim deleted successfully", data: result, meta: null });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    // Update
    update = async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const result = await ClaimSvc.updateClaim(id, data);
            res.json({ message: "Claim updated successfully", data: result, meta: null });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };
}

module.exports = new ClaimController();
