const employee=require("../controllers/doctorController")
const express=require("express")
const router=express.Router()

router.route("/getall").get(employee.getAllEmployee);
router.route("/create").post(employee.create);
router.route("/get/:id").get(employee.findOne).put(employee.update).delete(employee.delete);

module.exports=router;
