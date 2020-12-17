const health=require("../controllers/healthController");
const express=require("express")

const router=express.Router();

router.route("/getall").get(health.getAllHealth).post(health.create);
router.route("/create").post(health.create);
router.route("/get/:id").get(health.findOne).put(health.update).delete(health.delete);

module.exports=router;