const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator');
const confiq=require("../middleware/config").get(process.env.NODE_ENV)
const jwt=require("jsonwebtoken");
const {jwtkey} = require('../keys')
const accountSchema = new mongoose.Schema({
   acc_email:{
       type:String,
       unique:true,
       required:true
   },
   acc_pass:{
       type:String,
       required:true
   },
   acc_pass_confirm:{
       type:String,
       required:true,
       validate:{
           validator:function(el)
           {
               return el===this.acc_pass
           },
           message:"Passwords are not the same"
       }
   },
   roles:{
        type:String,
        enum:["PT","DT","SC","NS"],
        default:"PT"
    },
    active:{
        type:Boolean,
        default:true
    },
   resetPasswordToken:{
       type:String
   },
   resetPasswordExpires:
   {
       type:Date
   },
   token:{
       type:String
   }
})

accountSchema.pre('save',function(next){
    var account = this;
    if(account.isModified('acc_pass')){
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                return next(err);
            }
    
            bcrypt.hash(account.acc_pass,salt,(err,hash)=>{
                if(err){
                    return next(err);
                }
                account.acc_pass = hash;
                account.acc_pass_confirm=hash;
                next();
            })
        })
    }
    else{
        next();
    } 
});
accountSchema.methods.correctPassword = function(acc_pass,cb)
{
    bcrypt.compare(acc_pass, this.acc_pass,function(err,isMatch){
        if(err) return cb(next);
        cb(null,isMatch);
    });
};


accountSchema.methods.generateToken=function(cb){
    var user =this;
    var token=jwt.sign(user._id.toHexString(),confiq.SECRET);

    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
};
// find by token
accountSchema.statics.findByToken=function(token,cb){
    var user=this;

    jwt.verify(token,confiq.SECRET,function(err,decode){
        user.findOne({"_id": decode, "token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};




const Account=mongoose.model('Account',accountSchema);
module.exports=Account;
