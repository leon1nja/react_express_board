import moment from "moment";

export function getWeeks(formatType) {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('isoweek');
    var days = [];
    for (var i = 0; i <= 13; i++) {
        days.push(moment(weekStart).add(i, 'days').format(formatType));
    }
    return days;
}

export function getCurrentWeek(formatType) {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('isoweek');
    var days = [];
    for (var i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days').format(formatType));
    }
    return days;
}

export function getNextWeek(formatType) {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('isoweek');
    var days = [];
    for (var i = 7; i <= 13; i++) {
        days.push(moment(weekStart).add(i, 'days').format(formatType));
    }
    return days;
}

export function addYear(date) {
    const d = new Date();
    let year = d.getFullYear();
    return date = date + " " + year;
}

export function changeDateType(data) {
    const newDate = new Date(data.date);
    return data.date = moment(newDate).format("ddd MMM D Y");
}

export function changeDateTimeType(data) {
    return moment(data).format("HH:mm ddd MMM D Y");
}