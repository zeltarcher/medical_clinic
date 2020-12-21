const Account=require('../models/Account')

exports.getAllUser=(async(req,res)=>{
    await Account.find()
    .then(acc =>
        {
            res.status(200).json({
                length:acc.length,
                status:"Success",
                data:{
                    acc:acc
                }
                
            })
        }).catch(err=>{
            res.status(500).json({
                message:err.message||"Some error occured while retrieving users"
            })
})
});

exports.findOne=(async(req,res)=>{
    await Account.findById(req.params.id)
    .then(user=>{
        if(!user) return res.status(404).send({
            message: "User not found with id "+req.params.id
        });
        res.status(200).json({
            status:"Success",
            data:{
                user:user
            }
        })
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message: "User not found with id "+req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
    })
    });
});

exports.update=async(req,res)=>{
    await Account.findByIdAndUpdate(req.params.id,{
        roles:req.body.roles,
    },{new:true})
    .then(user=>{
        if(!user){
            return res.status(404).send({
                message:"User not found with id "+req.params.id
            });
        }
        res.status(200).json(
        {
            message:"Success",
            user:user
        });
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message: "User not found with id "+req.params.id
        
    });
}
    });
};
exports.add=(async(req,res)=>{
    await Account.findById(req.params.id)
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
    Account.findByIdAndRemove(req.params.id)
    .then(user=>{
        if(!user)
        {
            return res.status(404).send({
                message: "User not found with id "+req.params.id
            });
        }
        res.send("Success")
    }).catch(err=>{
        if(err.kind==='ObjectId'|| err.acc_email === 'NotFound'){
            return res.status(404).send({
                message: "User not found with id "+req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
    })
});
};
