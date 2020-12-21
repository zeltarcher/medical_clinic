const Account=require('../models/Account');
exports.auth =(req,res,next)=>{
    
    let token =req.cookies.auth;
    
    Account.findByToken(token,(err,account)=>{
        
        if(err) return res.status(400).send(err);
        
        if(!account) return res.status(400).json({message:"Please LogIn"});
        req.token= token;
        req.account=account;
        
        next();

    })
   
};
exports.restrict=(...role)=>{
    return(req,res,next)=>{
        if(!role.includes(req.account.roles)){
            //return next(new AppError('you do not have permission to perform this action',403));
            return res.status(403).send("Forbidden");
        }
        next();
    };
}
