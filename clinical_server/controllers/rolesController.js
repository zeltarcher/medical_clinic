const Role=require("../models/roles");
exports.getAllRole=(async(req,res)=>{
    await Role.find()
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
    const role=new Role ({
        roles:req.body.roles,
        active:req.body.active
    });
    role.save()
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
            message:err.message || "Some error occurred while creating Role"
        });
    });
};

exports.findOne=(async(req,res)=>{
    await Role.findById(req.params.id)
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
exports.add=(async(req,res)=>{
    await Role.findById(req.params.id)
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
exports.update=async(req,res)=>{
    await Role.findByIdAndUpdate(req.params.id,{
        roles:req.body.roles,
        active:req.body.active
        
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


exports.delete=(req,res)=>{
    Role.findByIdAndRemove(req.params.id)
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

