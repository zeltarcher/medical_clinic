const Health=require("../models/health");
exports.getAllHealth=(async(req,res)=>{
    await Health.find()
    .then(health=>
        {
            res.status(200).json({
                length:health.length,
                status:"Success",
                data:{
                    health:health
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
    await Health.findById(req.params.id)
    .then(health=>{
        if(!health) return res.status(404).send({
            message: "Can not found with id "+req.params.id
        });
        res.status(200).json({
            status:"Success",
            data:{
                health:health
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
    await Health.findByIdAndUpdate(req.params.id,{
        record:{
            record_height:req.body.record.record_height,
            record_weight:req.body.record.record_weight,
            record_lab_test:req.body.record.record_lab_test,
            record_diagnose:req.body.record.record_diagnose,
            record_prescription:req.body.record.record_prescription,
        },
        record_note:req.body.record_note,
        record_created:req.record_created
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
    const healths=new Health ({
        patient:req.body.patient,
        doctor:req.body.doctor,
        visit:req.body.visit,
        record:{
            record_height:req.body.record.record_height,
            record_weight:req.body.record.record_weight,
            record_lab_test:req.body.record.record_lab_test,
            record_diagnose:req.body.record.record_diagnose,
            record_prescription:req.body.record.record_prescription,

        },
        record_note:req.body.record_note,
        record_created:req.body.record_created
    });
    healths.save()
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
    Health.findByIdAndRemove(req.params.id)
    .then(health=>{
        if(!health)
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

