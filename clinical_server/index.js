const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser=require('cookie-parser');
const {mogoUri} = require('./keys')
const nodemailer=require("nodemailer");
const accs=require("./routes/userRoute");
const healths=require("./routes/healthRoute");
const patients=require("./routes/patientRoute");
const employees=require("./routes/employee");
const clinic=require("./routes/officeRoute");
const dotenv=require('dotenv').config({path:'../config.env'});
const app = express()
const PORT = 3000

require('./models/Account')

const clinicRoutes = require('./routes/clinicRoutes')
const requireToken = require('./middleware/requireToken')
const {auth,restrict}=require("./middleware/auth")
const aut=require("./middleware/requireToken")
app.use(cookieParser());
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

app.get('/',auth,restrict("PT"),(req,res)=>{

    res.status(200).send("Welcome")
});


app.use('/acc',accs);
app.use('/health',healths);
app.use('/patient',patients);
app.use('/emp',employees);
app.use('/office',clinic);

app.listen(PORT,()=>{
    console.log(`server iis running on http://127.0.0.1:`+PORT);
})
