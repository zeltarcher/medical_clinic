const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Account = mongoose.model('Account')
const {jwtkey} = require('../keys')
const confiq=require("../middleware/config").get(process.env.NODE_ENV)
module.exports = (req,res,next)=>{
    const { authorization } = req.headers
    console.log(authorization);
    // if(!authorization){
    //     return res.status(401).send({error:"You must be logged in"})
    // }
    const token = authorization.replace("Bearer","")
    jwt.verify(token,confiq.SECRECT,async(err,payload)=>{
        if(!authorization){
            return res.status(401).send({error:"You must be logged in"})
        }
        const {userId} = payload
        const user = await Account.findById(userId)
        req.user = user
        next()
    })
}
