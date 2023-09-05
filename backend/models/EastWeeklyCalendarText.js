const mongoose = require('mongoose')

const EastWeeklyCalendarTextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })


const EastWeeklyCalendarText = mongoose.model("EastWeeklyCalendarText", EastWeeklyCalendarTextSchema)

module.exports = EastWeeklyCalendarText