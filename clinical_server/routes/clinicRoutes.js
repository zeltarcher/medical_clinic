const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const {jwtkey} = require("../keys")
const router = express.Router()

const Account = mongoose.model("Account")
const Clinic = mongoose.model("Clinic")
const State = mongoose.model("State")

const bcrypt = require("bcrypt")
//const { try } = require("bluebird")

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
});

router.post("/addState",async(req,res)=>{
    const{state_initial,state_name} = req.body;

    try{
        const state = new State({state_initial,state_name})
        await state.save();
        res.send("add state succeed!!")
    }catch(err){
        res.status(422).send(err.message)
    }
});

router.post("/addClinic",async(req,res)=>{
    const{clinic_name,clinic_head_id,clinic_street,
            clinic_city,clinic_state,
            clinic_zipcode,clinic_phone,clinic_is_active}
            = req.body;
    try{
        const clinic = new Clinic({clinic_name,clinic_head_id,clinic_street,
                                    clinic_city,clinic_state,
                                    clinic_zipcode,clinic_phone,clinic_is_active})
        await clinic.save();
        res.send("add clinic succeed !!!")
    }catch(err){
        res.status(422).send(err.message)
    }
});

module.exports = router;