const visit=require('../controllers/visitController');
const express=require("express");
const router=express.Router();
const auth=require('../middleware/auth')


router.route("/getall").get(auth.auth,auth.restrict("DT","NS"),visit.getAllVisit);
router.route("/create").post(auth.auth,auth.restrict("DT"),visit.create);
router.route("/get/:id")
    .get(auth.auth,auth.restrict("DT","NS"),visit.findOne)
    .put(auth.auth,auth.restrict("DT"),visit.update)
    .patch(auth.auth,auth.restrict("DT"),visit.add)
    .delete(auth.auth,auth.restrict("DT"),visit.delete);
module.exports=router;