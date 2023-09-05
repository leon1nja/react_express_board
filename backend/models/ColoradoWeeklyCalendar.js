const mongoose = require('mongoose')

const ColoradoWeeklyCalendarSchema = new mongoose.Schema({
    trucks: {
        type: Array // Include value and status
    },
    date: {
        type: String,
        required: true
    },
    load: {
        type: Object // Include value and status
    },
    dispatched: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const ColoradoWeeklyCalendar = mongoose.model("ColoradoWeeklyCalendar", ColoradoWeeklyCalendarSchema)

module.exports = ColoradoWeeklyCalendar