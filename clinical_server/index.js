const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const {mogoUri} = require('./keys')
const PORT = 3000

require('./models/Account')

const clinicRoutes = require('./routes/clinicRoutes')
const requireToken = require('./middleware/requireToken')
app.use(bodyParser.json())
app.use(clinicRoutes)

mongoose.connect(mogoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("CONNECTED !!!!!!!!");
})

mongoose.connection.on("error",(err)=>{
    console.log("SHIITTY ERROR!",err);
})

app.get('/',requireToken,(req,res)=>{
    res.send({acc_email:req.account.acc_email})
})

app.listen(PORT,()=>{
    console.log('server iis running............'+PORT);
})