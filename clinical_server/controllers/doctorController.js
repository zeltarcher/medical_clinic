const Employees=require("../models/employee");
exports.getAllEmployee=(async(req,res)=>{
    await Employees.find()
    .then(data=>
        {
            res.status(200).json({
                length:data.length,
                status:"Success",
                data:{
                    data:data
                }
                
            })
        })
    .catch(err=>{
        res.status(500).json({
            message:err.message||"Some error occured while retrieving data"
        })
    })
});
exports.findOne=(async(req,res)=>{
    await Employees.findById(req.params.id)
    .then(data=>{
        if(!data) return res.status(404).send({
            message: "Can not found with id "+req.params.id
        });
        res.status(200).json({
            status:"Success",
            data:{
                data:data
            }
        })
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message: "Can not found with id "+req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
    })
    });
});
exports.update=async(req,res)=>{
    await Employees.findByIdAndUpdate(req.params.id,{
    
        employee_f_name:req.body.employee_f_name,
        employee_m_name:req.body.employee_m_name,
        employee_l_name:req.body.employee_l_name,
        employee_email:req.body.employee_email,
        emp_address:{
                street:req.body.emp_address.street,
                city:req.body.emp_address.city,
                state:req.body.emp_address.state,
                zipcode:req.body.emp_address.zipcode,
            },
        emp_Phone:req.body.emp_Phone,
        emp_DOB:req.body.emp_DOB,
        emp_ssn:req.body.emp_ssn,
        emp_start_date:req.body.emp_start_date,
        emp_end_date:req.body.emp_end_date,
        emp_active:req.body.emp_active
    },{new:true})
    .then(health=>{
        if(!health){
            return res.status(404).send({
                message:"Can not found with id "+req.params.id
            });
        }
        res.status(200).json(
        {
            message:"Success",
            health:health
        });
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message: "Can not found with id "+req.params.id
        
    });
}
    });
};
exports.create=(req,res)=>{
    const employee=new Employees ({
        employee_f_name:req.body.employee_f_name,
        employee_m_name:req.body.employee_m_name,
        employee_l_name:req.body.employee_l_name,
        employee_email:req.body.employee_email,
        emp_address:{
                street:req.body.emp_address.street,
                city:req.body.emp_address.city,
                state:req.body.emp_address.state,
                zipcode:req.body.emp_address.zipcode,
            },
        emp_Phone:req.body.emp_Phone,
        emp_DOB:req.body.emp_DOB,
        emp_ssn:req.body.emp_ssn,
        emp_start_date:req.body.emp_start_date,
        emp_end_date:req.body.emp_end_date,
        emp_active:req.body.emp_active
    });
    employee.save()
    .then(data=>{
        res.status(200).json({
            message:"OK",
            data:{
                data:data
            }
        })
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating Health"
        });
    });
};


exports.delete=(req,res)=>{
    Employees.findByIdAndRemove(req.params.id)
    .then(data=>{
        if(!data)
        {
            return res.status(404).send({
                message: "Can not found with id "+req.params.id
            });
        }
        res.send("Success")
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message: "Can not found with id "+req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete data with id " + req.params.id
    })
});
};

