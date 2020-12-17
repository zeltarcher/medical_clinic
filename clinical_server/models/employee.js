const mongoose=require('mongoose');
const bcrypt = require('bcrypt')
const validate=require('mongoose-validator');
const { default: validator } = require('validator');
const { json } = require('body-parser');
const Employee=new mongoose.Schema({
    employee_email:{
        type:String,
        unique:true,
        required:[true,"Must have an email"]
    },
    employee_f_name:{
        type:String,
        required:[true,"must have first name"]
    },
    employee_m_name:{
        type:String
    },
    employee_l_name:{
        type:String,
        required:[true,"must have last name"]
    },
    emp_address:{
        street:{
            type:String,
        },
        city:{
            type:String
        },
        state:{
            type:String,
            maxlength:2,
            

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
    emp_DOB:{
        type:Date,
    },
    emp_Phone:{
        type:Number,
        maxlength:10,
        min:10
    },
    emp_ssn:{
        type:String,
        validate:
            {
                validator:function(el)
                {
                        
                        return validator.isNumeric(el) && el.length===9;
                },
                message:"SSN must be 9 and must be numberic"
            },
        unique:[true,"Wrong ssn"]
        
    },
    emp_start_date:{
        type:Date,
        default:Date.now()
    },
    emp_end_date:{
        type:Date,
        default:Date.now()
    },
    emp_active:{
        type:Boolean,
        default:true
    }


});


Employee.pre('save',function(next){
    var employee = this;
    var str= employee.emp_ssn;
    var strs=str.substring(0, 5);
    if(employee.isModified('emp_ssn')){
        var re=str.replace(strs,"XXXX-")

        employee.emp_ssn=re;
        next();  
        
    }
    else 
    {
       next();
    }
        
});
// Employee.pre('save',function(next){
//   next()
        
// });




Employee.virtual("key",{
    ref:"Employee",
    foreignField: 'doctor',
    localField:"_id"
});
Employee.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });

const Employees=mongoose.model('Employee',Employee);
module.exports=Employees;
