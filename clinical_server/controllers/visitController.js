const Visit=require("../models/visit");
exports.getAllVisit=(async(req,res)=>{
    await Visit.find()
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
exports.create=(req,res)=>{
    const visits=new Visit ({
        patient:req.body.patient,
        doctor:req.body.doctor,
        visit_nurse:req.body.visit_nurse,
        clinic:req.body.clinic,
        visit_ref:req.body.visit_ref,
        time:{
            start:req.body.start,
            end:req.body.end,
        }
    });
    visits.save()
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

exports.findOne=(async(req,res)=>{
    await Visit.findById(req.params.id)
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
    await Visit.findByIdAndUpdate(req.params.id,{
    
        patient:req.body.patient,
        doctor:req.body.doctor,
        visit_nurse:req.body.visit_nurse,
        clinic:req.body.clinic,
        visit_ref:req.body.visit_ref,
        time:{
            start:req.body.time.start,
            end:req.body.time.end,
        }
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
exports.add=(async(req,res)=>{
    await Visit.findById(req.params.id)
    .then(data=>{
        if(!data)
        {
            return res.status(404).send({
                message: "Can not found with id "+req.params.id
            });
        }
        res.status(200).json({
            status:"success",
            data:{
                data:"<Updated tour here...>",
                
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



exports.delete=(req,res)=>{
    Visit.findByIdAndRemove(req.params.id)
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

