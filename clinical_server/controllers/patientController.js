const Patient=require("../models/patient");
exports.getAllPatient=(async(req,res)=>{
    await Patient.find()
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
    await Patient.findById(req.params.id)
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
    await Patient.findByIdAndUpdate(req.params.id,{
    
        patient_f_name:req.body.patient_f_name,
        patient_m_name:req.body.patient_m_name,
        patien_l_name:req.body.patien_l_name,
        patient_email:req.body.patient_email,
        patient_address:{
                street:req.body.patient_address.street,
                city:req.body.patient_address.city,
                state:req.body.patient_address.state,
                zipcode:req.body.patient_address.zipcode,
            },
        phone:req.body.phone,
        DOB:req.body.DOB,
        doctor:req.body.doctor,
        married_status:req.body.married_status,
        gender:req.body.gender,
        race:req.body.race,
        vet:req.body.vet
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
    const patients=new Patient ({
        patient_f_name:req.body.patient_f_name,
        patient_m_name:req.body.patient_m_name,
        patient_l_name:req.body.patient_l_name,
        patient_email:req.body.patient_email,
        patient_address:{
            street:req.body.patient_address.street,
            city:req.body.patient_address.city,
            state:req.body.patient_address.state,
            zipcode:req.body.patient_address.zipcode
            },
        phone:req.body.phone,
        DOB:req.body.DOB,
        doctor:req.body.doctor,
        married_status:req.body.married_status,
        gender:req.body.gender,
        race:req.body.race,
        vet:req.body.vet
    });
    patients.save()
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
    Patient.findByIdAndRemove(req.params.id)
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

