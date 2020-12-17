const express = require("express")
const mongoose = require("mongoose")
const {SENDGRID_USER,SENDGRID_PASSWORD,SENDGRID_API_KEY} = require('../keys');
const jwt = require("jsonwebtoken")
const waterfall=require("async-waterfall");
const crypto=require("crypto");
const nodemailer=require("nodemailer");
const sgMail=require("@sendgrid/mail");
const {jwtkey} = require("../keys")
const router = express.Router()
const bycrypt=require("bcrypt");
const Account = mongoose.model("Account")
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
//const Account=require("../models/Account.js");

router.post("/signup", async(req,res)=>{
    

    try{
        //const{acc_email,acc_pass,acc_pass_confirm} = req.body;
        const account = new Account(req.body);
        if(account.acc_pass!=account.acc_pass_confirm)return res.status(400).json({message: "password not match"});
        Account.findOne({acc_email:account.acc_email},function(err,user){
            if(user)
            {
                return res.status(400).json({ auth : false, message :"email exits"});
            }
        });
        await account.save((err,doc)=>{
            if(err)
            {
                return res.status(400).send("fail");
            }
            else{
                res.status(200).json({
                succes:true,
                message:"Resigter Successfully",
                user:doc

            })
            }
        });
    //    const token = jwt.sign({accId:account._id},jwtkey)
        
    //     res.status(500).send({token,acc_email});
    }catch(err){
        return res.status(422).send(err.message)
    }
});


router.post("/signin", function (req, res) {
    //const { acc_email, acc_pass } = req.body;
    let token=req.cookies.auth;
    Account.findByToken(token,(err,user)=>{
        if(err) return res(err);
        if(user) return res.status(400).json({error :true,message:"You are already logged in"});
        else{
            Account.findOne({'acc_email':req.body.acc_email},function(err,user)
            {
                if(!user) return res.status(400).json({isAuth : false, message : ' Auth failed ,email not found'});
                user.correctPassword(req.body.acc_pass,(err,isMatch)=>{
                    if(!isMatch) return res.status(400).json({ isAuth : false,message : "password doesn't match"}); 
                });
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        email : user.acc_email,
                        token:user.token
                    });
                    

                });
            }
            
            )

        }
            
    })

    
});
  
    // if (!acc_email || !acc_pass) {
    //   return res
    //     .status(422)
    //     .send({ error: "must provide username and password" });
    // }
    // const account = await Account.findOne({ 'acc_email':req.body.acc_email });
    // if (!account) {
    //   return res.status(422).send({ error: "username is incorrect!" });
    // }
    // try {
    //     if(!await account.correctPassword(acc_pass,account.acc_pass))
    //     {
    //         return res.status(422).send({ error: "pass is incorrect!" });
    //     }
          
    //     const token = jwt.sign({ userId: account._id }, jwtkey);
    //     res.send({ token });
      
      
    // } catch (err) {
    //   return res.status(422).send({ error: "password is incorrect!" });
    // }
    //});


router.post('/logout',async(req,res)=>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
      });
      res.status(200).json({ status: 'success' });
})


router.post('/forgot',function(req,res,next){
    waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
              });
        },
        function(token,done){
            Account.findOne({acc_email:req.body.acc_email},function(err,acc){
                if(!acc){
                    return res.status(200).send("No account with that email address exists");
                }
                acc.resetPasswordToken=token;
                acc.resetPasswordExpires=Date.now()+900000;

                acc.save(function(err){
                    done(err,token,acc);
                })
            })
        },
        function(token,acc,done)
        {
           
            var smtpTransport = nodemailer.createTransport( {
                // host: "smtp.mailtrap.io",
                // port: 2525,
                // auth: {
                // user: "ddd852d5fee586",
                // pass: "fa4a7d96139b14"
                //     }

                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                },
                
            });
            var mailOptions = {
                to: acc.acc_email,
                from: 'letanthanh95@gmail.com',
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            smtpTransport.sendMail(mailOptions, function(err) {
                res.status(200).send("An e-mail has been sent to "+acc.acc_email+" with further instructions.");
                done(err, 'done');
              }); 
        }
    ],function(err){
        if(err) return next(err);
        res.status(200).send("sent email")
    })
})


router.get('/reset/:token',function(req,res){
    Account.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt:Date.now()}},function(err,user){
        if(!user)
        {
            return res.status(400).send("Password reset tiken is invalid or has expired.");
        }
        res.status(200).json({user:req.acc_email})
    })
})

router.post('/reset/:token',function(req,res,next){
    waterfall([
        function(done){
            Account.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt:Date.now()}},function(err,acc){
                if(!acc){
                    return res.status(400).send("Password reset token is invalid or has expired.");
                }
                acc.acc_pass=req.body.acc_pass;
                acc.acc_pass_confirm=req.body.acc_pass_confirm;
                acc.resetPasswordToken=undefined;
                acc.resetPasswordExpires=undefined;

                acc.save(function(err){
                    
                    done(err,acc);
                })
            })
        },
        function(acc,done)
        {
           
            var smtpTransport = nodemailer.createTransport( {
                // host: "smtp.mailtrap.io",
                // port: 2525,
                // auth: {
                // user: "ddd852d5fee586",
                // pass: "fa4a7d96139b14"
                //     }

                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                },
                
            });
            var mailOptions = {
                to: acc.acc_email,
                from: 'letanthanh95@gmail.com',
                subject: 'Password Changed',
                text: 'You are receiving this because your password had changed.\n\n'
                  
            };

            smtpTransport.sendMail(mailOptions, function(err) {
                res.status(200).send("success");
                done(err, 'done');
              }); 
        }
    ],function(err){
        if(err) return next(err);
        res.status(200).send("sent email")
    })
})

module.exports = router;