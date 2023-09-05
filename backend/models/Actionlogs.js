const mongoose = require('mongoose')

const TruckListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
    },
    column: {
        type: String
    },
    prevValue: {
        type: String
    },
    newValue:{
        type: String
    },
    title:{
        type: String
    },
    board: {
        type: String
    }
}, { timestamps: true })


const Actionlogs = mongoose.model("Actionlogs", TruckListSchema)

module.exports = Actionlogs