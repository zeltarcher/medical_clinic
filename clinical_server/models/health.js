const mongoose=require("mongoose");
const Healths=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employees",
        required:true
    },
    visit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Visit"
    },
    record:{
    
        record_height:{
            type:Number,
            required:true
             
        },
        record_weight:{
            type:Number,
            required:true
            
            
        },
        record_lab_test:{
            type:String,
            required:true
            
    
        },
        record_diagnose:{
            type:String,
            required:true
        },
        record_prescription:{
            type:String,
            required:true
        },
        
    },
    record_note:{
        type:String,
    },
    record_created:{
        type:Date,
        default:Date.now()
    },
});


Healths.pre("save",function(next){
    next();
});
Healths.pre(/^find/, function(next) {
  
    this.populate({
      path: 'doctor',
      select: 'employee_f_name employee_l_name'
    });
    next();
});
  
// Health.post('save', function(doc, next) {
//   doc.populate({path:'doctor',select:'employee_f_name employee_l_name'})
//   .execPopulate()
//   .then(function() {
//       next();
//   });
// });

  //patient
Healths.pre(/^find/, function(next) {
  this.populate({
    path: 'patient',
    select: 'patient_f_name patient_l_name'
  });
    next();
});
  
// Health.post('save', function(doc, next) {
//   doc.populate({path:'patient',select:'patient_f_name patient_l_name'});
//   next();
  
// });



const Health=mongoose.model("Health",Healths);
module.exports=Health;