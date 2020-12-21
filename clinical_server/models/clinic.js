const mongoose=require("mongoose");
const validate=require("mongoose-validator");
const { default: validator } = require("validator");
const { model } = require("./patient");
const Clinics=new mongoose.Schema({
    clinic_name:{
        type:String,
        required:[true,"Must have a Name"]
    },
    clinic_head:{
        type:String,
    },
    clinic_address:{
        street:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String,
            maxlength:2,
            uppercase:true
        },
        zipcode:{
            type:String,
            validate:
            {
                validator:function(el)
                {
                    return validator.isNumeric(el) && el.length===4;
                },
                message:"zipcode must be 4 and must be numberic"
            }
        }
    },
    phone:{
        type:Number,
        maxlength:10
    },
    isActive:{
        type:Boolean,
        default:true
    }
});
Clinics.pre("save",function(next){
    next();
});

Clinics.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });


const Clinic=mongoose.model("Clinic",Clinics);
module.exports=Clinic