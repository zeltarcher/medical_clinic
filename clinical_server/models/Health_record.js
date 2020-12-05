const mongoose = require('mongoose')

const Health_recordSchema = mongoose.Schema({
    patient_id:{

    },
    emp_id:{

    },
    visit_id:{

    },
    record_height:{

    },
    record_weight:{

    },
    record_lab_tests:{

    },
    record_diagnose:{

    },
    record_prescription:{

    },
    record_note:{

    },
    record_create_ti:{

    },
    recodr_update_ti:{
        type:Date,
        default:Date.now
    }
})

mongoose.model("Health_record",Health_recordSchema)