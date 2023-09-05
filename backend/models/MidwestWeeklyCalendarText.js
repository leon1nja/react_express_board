const mongoose = require('mongoose')

const MidwestWeeklyCalendarTextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })


const MidwestWeeklyCalendarText = mongoose.model("MidwestWeeklyCalendarText", MidwestWeeklyCalendarTextSchema)

module.exports = MidwestWeeklyCalendarText