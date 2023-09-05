const mongoose = require('mongoose')

const UtahWeeklyCalendarSchema = new mongoose.Schema({
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
    },
}, { timestamps: true })


const UtahWeeklyCalendar = mongoose.model("UtahWeeklyCalendar", UtahWeeklyCalendarSchema)

module.exports = UtahWeeklyCalendar