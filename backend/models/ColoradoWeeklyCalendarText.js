const mongoose = require('mongoose')

const ColoradoWeeklyCalendarTextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })


const ColoradoWeeklyCalendarText = mongoose.model("ColoradoWeeklyCalendarText", ColoradoWeeklyCalendarTextSchema)

module.exports = ColoradoWeeklyCalendarText