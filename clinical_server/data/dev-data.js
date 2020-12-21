const mongoose=require('mongoose');
const fs=require('fs');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const {mogoUri} = require('../keys')
const Account=require('../models/Account');
const Employees = require('../models/employee');
const Health=require("../models/health");

console.log(process.env);
// const DB=process.env.DATABASE.replace(
//     '<PASSWORD>', 
//     process.env.DATABASE_PASSWORD
//  )
const DB=mogoUri;




mongoose.connect(DB,{
    useNewUrlParser:true,
   useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true //turn off warnings
}).then(()=>{console.log('DB connection successful')});






//import data to databse
// const importData=async()=>{
//     try{
//         await Tour.create(tours);
//         await User.create(users,{validateBeforeSave:false});
//         await Review.create(reviews);
//         console.log('Data successfully loaded!');
//     }catch(err){
//         console.log(err);
//     }
// };
// DELETE ALL DATA FROM DB
const deleteData=async()=>{
    try{
        await Account.deleteMany();
        await Employees.deleteMany();
        await Health.deleteMany();
        console.log('Data sccessfully deleted!');
        process.exit();
    }catch(err){
        console.log(err);
    }
}
if(process.argv[2]==='--import')
{
    importData();
}else if (process.argv[2]==='--delete')
{

    deleteData();
}
console.log(process.argv);// the array of running this node process

