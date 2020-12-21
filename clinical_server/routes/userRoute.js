const express=require('express');
const account=require("../controllers/accountController");
const auth=require("../middleware/auth");
const router=express.Router();
const app=express();




router.route('/account').get(auth.auth,auth.restrict('Admin'),account.getAllUser);
router.route('/account/:id')
.get(auth.auth,auth.restrict('Admin'),account.findOne)
.patch(auth.auth,auth.restrict('Admin'),account.add)
.put(auth.auth,auth.restrict('Admin'),account.update)
.delete(auth.auth,auth.restrict('Admin'),account.delete);

module.exports=router;