const mongoose=require("mongoose");
const validate=require("mongoose-validator");
const { default: validator } = require("validator");
const Visits=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employees"
    },
    visit_nurse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employees"
    },
    clinic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Clinic"
    },
    visit_ref:{
        type:Number,
        validate:
        {
          validator:function(el)
        {
          return validator.isAlphanumeric(el) && el.length===12
        },
        message: "Ref must be 12 characters"
        }
        
    },
    
    time:{
        start:{
            type:Date,
            default:Date.now()
        },
        end:{
            type:Date,
            default:Date.now()
        }
    }
});
Visits.pre("save",function(next){
    next();
});


Visits.pre(/^find/, function(next) {
  
    this.populate({
      path: 'doctor',
      select: 'employee_f_name employee_l_name roles',
      match:{roles:{$eq:"DT"}}
    });
    next();
});
//visit nurse
Visits.pre(/^find/, function(next) {
  
  this.populate({
    path: 'visit_nurse',
    select: 'employee_f_name employee_l_name roles',
    match:{roles:{$eq:"NS"}}
  });
  next();
});

  
Visits.post('save', function(doc, next) {
    doc.populate({path:'doctor',select:'fname lname'}).execPopulate().then(function() {
      next();
    });
  });

  //patient
Visits.pre(/^find/, function(next) {
  
    this.populate({
      path: 'patient',
      select: 'patient_f_name patient_l_name'
    });
    next();
  });
  
Visits.post('save', function(doc, next) {
    doc.populate({path:'patient',select:'patient_f_name patient_l_name'}).execPopulate().then(function() {
      next();
    });
  });

  //clinic
  Visits.pre(/^find/, function(next) {
  
    this.populate({
      path: 'clinic',
      select: 'clinic_name phone'
    });
    next();
  });
  
Visits.post('save', function(doc, next) {
    doc.populate({path:'clinic',select:'clinic_name phone'}).execPopulate().then(function() {
      next();
    });
  });



const Visit=mongoose.model("Visit",Visits);
module.exports=Visit;