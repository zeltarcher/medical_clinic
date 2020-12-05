const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const accountSchema = new mongoose.Schema({
   acc_email:{
       type:String,
       unique:true,
       require:true
   },
   acc_pass:{
       type:String,
       require:true
   }
})

accountSchema.pre('save',function(next){
    const account = this;
    if(!account.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }

        bcrypt.hash(account.acc_pass,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            account.acc_pass = hash;
            next();
        })
    })
})

mongoose.model('Account',accountSchema);