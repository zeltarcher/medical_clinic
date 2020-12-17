const mongoose=require("mongoose");
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
        type:Number
    },
    roles:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Role"
    },
    
    time:{
        start:{
            type:Date,
            required:true
        },
        end:{
            type:Date,
            required:true
        }
    }
});
Visits.pre("save",function(next){
    next();
});


Visits.pre(/^find/, function(next) {
  
    this.populate({
      path: 'doctor',
      select: 'fname lname'
    });
    next();
});
//visit nurse
Visits.pre(/^find/, function(next) {
  
  this.populate({
    path: 'visit_nurse',
    select: 'fname lname',
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
      select: 'fname lname'
    });
    next();
  });
  
Visits.post('save', function(doc, next) {
    doc.populate({path:'patient',select:'fname lname'}).execPopulate().then(function() {
      next();
    });
  });

  //clinic
  Visits.pre(/^find/, function(next) {
  
    this.populate({
      path: 'clinic',
      select: 'clinic_name'
    });
    next();
  });
  
Visits.post('save', function(doc, next) {
    doc.populate({path:'clinic',select:'clinic_name'}).execPopulate().then(function() {
      next();
    });
  });



const Visit=mongoose.model("Visit",Visits);
module.exports=Visit;