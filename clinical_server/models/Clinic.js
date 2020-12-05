const mongoose = require('mongoose')

const clinicSchema = new mongoose.Schema({
    clinic_name:{
        type:String
    },
    clinic_head_id:{
        type:String
    },
    clinic_street:{
        type:String
    },
    clinic_city:{
        type:String
    },
    clinic_state:{
        type:String
    },
    clinic_zipcode:{
        type:String
    },
    clinic_phone:{
        type:String
    },
    clinic_is_active:{
        type:Boolean,
        require:true
    }
})

mongoose.model('Clinic',clinicSchema);