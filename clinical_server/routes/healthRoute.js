const health=require("../controllers/healthController");
const express=require("express")

const router=express.Router();
const auth=require("../middleware/auth")

router.route("/getall").get(auth.auth,auth.restrict("DT","NS","PT"),health.getAllHealth);
router.route("/create").post(auth.auth,auth.restrict("DT","NS"),health.create);
router.route("/get/:id")
.get(auth.auth,auth.restrict("DT","NS","PT"),health.findOne)
.patch(auth.auth,auth.restrict("DT","NS"),health.add)
.put(auth.auth,auth.restrict("DT","NS"),health.update)
.delete(auth.auth,auth.restrict("DT","NS"),health.delete);

module.exports=router;