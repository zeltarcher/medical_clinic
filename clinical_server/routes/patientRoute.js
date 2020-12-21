const patient=require("../controllers/patientController");
const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth")


router.route('/getall').get(auth.auth,auth.restrict("DT","NS"),patient.getAllPatient);
router.route('/create').post(auth.auth,auth.restrict("DT","NS"),patient.create);
router.route('/get/:id')
.get(auth.auth,auth.restrict("DT","NS","PT"),patient.findOne)
.patch(auth.auth,auth.restrict("DT","NS"),patient.add)
.put(auth.auth,auth.restrict("DT","NS"),patient.update);
//.delete(auth.auth,auth.restrict("DT","NS"),patient.delete);
module.exports=router;