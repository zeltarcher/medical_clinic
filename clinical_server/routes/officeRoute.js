const clinic=require('../controllers/clinicController');
const express=require("express");
const router=express.Router();
router.route("/getall").get(clinic.getAllClinic);
router.route("/create").post(clinic.create);
router.route("/get/:id").get(clinic.findOne).put(clinic.update).delete(clinic.delete);
module.exports=router;