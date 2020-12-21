const clinic=require('../controllers/clinicController');
const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth")


router.route("/getall").get(clinic.getAllClinic);
router.route("/create").post(auth.auth,auth.restrict("Admin"),clinic.create);
router.route("/get/:id")
.get(auth.auth,auth.restrict("Admin"),clinic.findOne)
.patch(auth.auth,auth.restrict("Admin"),clinic.add)
.put(auth.auth,auth.restrict("Admin"),clinic.update)
.delete(auth.auth,auth.restrict("Admin"),clinic.delete);
module.exports=router;