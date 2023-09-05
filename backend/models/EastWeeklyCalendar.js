const mongoose = require('mongoose')

const EastWeeklyCalendarSchema = new mongoose.Schema({
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


const EastWeeklyCalendar = mongoose.model("EastWeeklyCalendar", EastWeeklyCalendarSchema)

module.exports = EastWeeklyCalendar