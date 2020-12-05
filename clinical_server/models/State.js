const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    state_initial:{
        type:String,
        require:true
    },
    state_name:{
        type:String,
        require:true
    }
})

mongoose.model("State",stateSchema)