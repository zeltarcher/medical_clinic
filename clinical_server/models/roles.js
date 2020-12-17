const mongoose=require("mongoose");
const Roles=new mongoose.Schema({
    roles:{
        type:String,
        enum:["PT","DT","SC","NS"],
    },
    active:{
        type:Boolean,
        default:true
    }
});
Roles.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });


const Role=mongoose.model("Role",Roles);
module.exports=Role