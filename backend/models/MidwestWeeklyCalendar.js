const mongoose = require('mongoose')

const MidwestWeeklyCalendarSchema = new mongoose.Schema({
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


const MidwestWeeklyCalendar = mongoose.model("MidwestWeeklyCalendar", MidwestWeeklyCalendarSchema)

module.exports = MidwestWeeklyCalendar