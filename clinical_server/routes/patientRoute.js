const patient=require("../controllers/patientController");
const express=require("express");
const router=express.Router();

router.route('/getall').get(patient.getAllPatient);
router.route('/create').post(patient.create);
router.route('/get/:id').get(patient.findOne).put(patient.update)
.delete(patient.delete);
module.exports=router;