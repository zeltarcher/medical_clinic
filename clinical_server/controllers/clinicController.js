const Clinic=require("../models/clinic");
exports.getAllClinic=(async(req,res)=>{
    await Clinic.find()
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
    await Clinic.findById(req.params.id)
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
    await Clinic.findByIdAndUpdate(req.params.id,{
    
        clinic_name:req.body.clinic_name,
        clinic_head:req.body.clinic_head,
        patien_l_name:req.body.patien_l_name,
        clinic_address:{
                street:req.body.clinic_address.street,
                city:req.body.clinic_address.city,
                state:req.body.clinic_address.state,
                zipcode:req.body.clinic_address.zipcode,
            },
        phone:req.body.phone,
        isActive:req.body.isActive,
    },{new:true})
    .then(data=>{
        if(!data){
            return res.status(404).send({
                message:"Can not found with id "+req.params.id
            });
        }
        res.status(200).json(
        {
            message:"Success",
            data:data
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
    const clinic=new Clinic ({
        clinic_name:req.body.clinic_name,
        clinic_head:req.body.clinic_head,
        patien_l_name:req.body.patien_l_name,
        clinic_address:{
                street:req.body.clinic_address.street,
                city:req.body.clinic_address.city,
                state:req.body.clinic_address.state,
                zipcode:req.body.clinic_address.zipcode,
            },
        phone:req.body.phone,
        isActive:req.body.isActive,
    });
    clinic.save()
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
    Clinic.findByIdAndRemove(req.params.id)
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

