const mongoose=require("mongoose");
const validate=require("mongoose-validator");
const { default: validator } = require("validator");
const Employee=require("../models/employee");
const Patients=new mongoose.Schema({
    patient_f_name:{
        type:String,
        required:[true,"First name must be required"]
    },
    patient_m_name:{
        type:String,
    },
    patient_l_name:{
        type:String,
        required:[true,"Last name must be required"]
    },
    patient_email:{
        type:String,
        unique:true,
        required:true
    },
    patient_address:{
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
        zipcode:
        {
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
    phone:
    {
        type:String,
        maxlength:10,
        required:true
    },
    DOB:{
        type:Date,
        default:Date.now()
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employees"
    },
    married_status:{
        type:String,
        enum:["yes","no"],
    },
    gender:{
        type:String,
        enum:["male","female","Not Answer"],
    },
    race:{
        type:String,
        enum:["White","Black","Asian","Hispanic","Other"]
    },
    vet:{
        type:String,
        enum:["yes","no"]
    }

});
Patients.pre("save",function(next){
    next();
});
Patients.virtual("key",{
    ref:"Patient",
    foreignField: 'patient',
    localField:'_id'

});
Patients.pre(/^find/, function(next) {
  
    this.populate({
      path: 'doctor',
      select: 'employee_f_name employee_l_name'
    });
    next();
  });
  
Patients.post('save', function(doc, next) {
    doc.populate({path:'doctor',select:'employee_f_name employee_l_name'}).execPopulate().then(function() {
      next();
    });
  });


const Patient=mongoose.model("Patient",Patients);
module.exports=Patient;