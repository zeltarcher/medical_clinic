const express=require("express");
const dotenv=require('dotenv');
const mongoose=require("mongoose");
dotenv.config({path:'./config.env'});
const app=express();


const DB=process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser:true,
   useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true //turn off warnings
}).then(()=>{console.log('DB connection successful')});

app.get("/",function(req,res){
    res.send("Hello");
});


const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`app running in http://127.0.0.1:${port}...`);
});
