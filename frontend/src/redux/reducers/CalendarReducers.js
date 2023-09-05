import {ToastHandler} from "../ToastHandler.js";


var InitState = {
    calendars: [],
    calendar: {},
    EditCalendarModal: false,
    calendar_next:{}
}

export const CalendarReducer = (state = InitState, action) => {

    switch (action.type) {
        case "ADD_CALENDAR":
            ToastHandler(action.payload)

            return state;
        case "ADD_NEW_CALENDAR":
            return { ...state, calendars: [ ...state.calendars,action.payload] };

        case "GET_CALENDARS":
            return { ...state, calendars: action.payload.msg };
        case "DELETE_CALENDAR":
            ToastHandler(action.payload)

            const filtered = state.calendars.filter(calendar => calendar._id !== action.payload.calendar._id)
            return { ...state, calendars: filtered };
        case "EDIT_CALENDAR_MODAL":
            const selected = state.calendars.filter(calendar => calendar._id === action.payload.id)
            return { ...state, EditCalendarModal: action.payload.open, calendar: selected.length !== 0 ? selected[0] : {} };
        case "EDIT_CALENDAR":
            return {
                ...state,
                calendars: state.calendars.map(person => (person._id === action.payload.calendar._id) ? action.payload.calendar : person),
            };
        case "CALENDAR":
            return {...state,calendar:action.payload}
        case "CALENDAR_NEXT":
            return {...state,calendar_next:action.payload}

        default:
            return state;
    }
}



