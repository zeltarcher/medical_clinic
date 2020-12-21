const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');



const cookieParser=require('cookie-parser');
const {mogoUri} = require('./keys')
const nodemailer=require("nodemailer");
const accs=require("./routes/userRoute");
const healths=require("./routes/healthRoute");
const patients=require("./routes/patientRoute");
const employees=require("./routes/employee");
const clinic=require("./routes/officeRoute");
const role=require("./routes/roleRoute");
const visit=require("./routes/visitRoute");



const dotenv=require('dotenv').config({path:'../config.env'});
const app = express()
const PORT = 3000
app.enable('trust proxy');
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
    useUnifiedTopology:true,
    useFindAndModify:false
})

mongoose.connection.on('connected',()=>{
    console.log("CONNECTED !!!!!!!!");
})

mongoose.connection.on("error",(err)=>{
    console.log("SHIITTY ERROR!",err);
});


// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());







app.get('/',auth,restrict("PT"),(req,res)=>{

    res.status(200).send("Welcome")
});


app.use('/acc',accs);
app.use('/health',healths);
app.use('/patient',patients);
app.use('/emp',employees);
app.use('/office',clinic);
app.use('/role',role);
app.use('/visit',visit);


app.all('*', (req, res, next) => {
    res.status(404).send("URL is not existed");
  });
app.listen(PORT,()=>{
    console.log(`server iis running on http://127.0.0.1:`+PORT);
})
