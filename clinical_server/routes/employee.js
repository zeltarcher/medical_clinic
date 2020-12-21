const employee=require("../controllers/doctorController")
const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth")
router.route("/getall").get(auth.auth,auth.restrict("Admin"),employee.getAllEmployee);
router.route("/create").post(auth.auth,auth.restrict("Admin"),employee.create);
router.route("/get/:id")
.get(auth.auth,auth.restrict("Admin","DT","NS"),employee.findOne)
.patch(auth.auth,auth.restrict("Admin"),employee.add)
.put(auth.auth,auth.restrict("Admin"),employee.update)
.delete(auth.auth,auth.restrict("Admin"),employee.delete);

module.exports=router;
