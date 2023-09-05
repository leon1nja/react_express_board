const mongoose = require('mongoose')

const UtahWeeklyCalendarTextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })


const UtahWeeklyCalendarText = mongoose.model("UtahWeeklyCalendarText", UtahWeeklyCalendarTextSchema)

module.exports = UtahWeeklyCalendarText