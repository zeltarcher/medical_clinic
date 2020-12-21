const role=require("../controllers/rolesController");
const express=require("express");
const router=express.Router();
const auth=require('../middleware/auth')



router.route("/getall").get(auth.auth,auth.restrict('Admin'),role.getAllRole);
router.route("/create").post(auth.auth,auth.restrict('Admin'),role.create);
router.route("/get/:id")
.get(auth.auth,auth.restrict('Admin'),role.findOne)
.patch(auth.auth,auth.restrict('Admin'),role.add)
.put(auth.auth,auth.restrict('Admin'),role.update)
.delete(auth.auth,auth.restrict('Admin'),role.delete);
module.exports=router;
