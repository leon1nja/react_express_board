const mongoose = require('mongoose')

const WeeklyCalendarSchema = new mongoose.Schema({
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


const WeeklyCalendar = mongoose.model("WeeklyCalendar", WeeklyCalendarSchema)

module.exports = WeeklyCalendar