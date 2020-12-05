const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const {jwtkey} = require("../keys")
const router = express.Router()

const Account = mongoose.model("Account")

const bcrypt = require("bcrypt")

router.post("/signup", async(req,res)=>{
    const{acc_email,acc_pass} = req.body;

    try{
        const account = new Account({acc_email,acc_pass})
        await account.save();
        const token = jwt.sign({accId:account._id},jwtkey)
        res.send({token})
    }catch(err){
        return res.status(422).send(err.message)
    }
})

module.exports = router;