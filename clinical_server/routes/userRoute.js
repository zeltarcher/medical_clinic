const express=require('express');
const account=require("../controllers/accountController");
const {aut}=require("../middleware/auth");
const router=express.Router();


router.route('/account').get(account.getAllUser);
router.route('/account/:id').get(account.findOne).put(account.update).delete(account.delete);

module.exports=router;