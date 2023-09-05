import axios from 'axios';

// Add new row to the calendar
export const AddRowToUtahCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/addRow`, { date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "NEW_CALENDAR_ROW_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "NEW_CALENDAR_ROW_UTAHCALENDAR", payload: error.message })
    }
}

// Get datas of one week for calendar
export const GetWeeklyUtahCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/getInfosByDate`, { ...date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_INFOS_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "GET_INFOS_UTAHCALENDAR", payload: error.message })
    }
}

// Delete a row of calendar
export const DeleteRowUtahCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}utahCalendar/deleteRow?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "DELETED_ROW_UTAHCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "DELETED_ROW_UTAHCALENDAR", payload: error.message })
    }
}

// Load dispatched action
export const LoadDispatchUtahCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/loadDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Undispatched action
export const UnDispatchUtahCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/unDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a truck 
export const DeleteTrucksInfoUtahCalendar = (changedTrucks, deletedVaule, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/deleteTrucksInfo`, { changedTrucks, deletedVaule, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a load
export const DeleteLoadInfoUtahCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/deleteLoadInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_INFO_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_INFO_UTAHCALENDAR", payload: error.message })
    }
}

// Delete a load info
export const DeleteLoadAddInfoUtahCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/deleteLoadAddInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_ADDINFO_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_ADDINFO_UTAHCALENDAR", payload: error.message })
    }
}

// Drag and drop action
export const DragAndDropUtahCalendar = (dragTrucks, dragId, dropTrucks, dropId, changedValue, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/dragAndDrop`, { dragTrucks, dragId, dropTrucks, changedValue, dropId }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Update or add truck
export const UpdateTrucksUtahCalendar = (trucks, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/updateTrucks`, { trucks, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "UPDATED_TRUCKS_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "UPDATED_TRUCKS_UTAHCALENDAR", payload: error.message })
    }
}

// Add Truckinfo
export const AddTruckInfoUtahCalendar = (truckInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/addTruckInfo`, { truckInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "ADDED_TRUCKINFO_UTAHCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "ADDED_TRUCKINFO_UTAHCALENDAR", payload: error.message })
    }
}

// Add Loadinfo
export const AddLoadInfoUtahCalendar = (LoadInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/addLoadInfo`, { LoadInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_LOADINFO_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_LOADINFO_UTAHCALENDAR", payload: error.message })
    }
}

// Update or add load
export const UpdateLoadUtahCalendar = (load, date, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/updateLoad`, { load, date, id }, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "UPDATED_LOAD_UTAHCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "UPDATED_LOAD_UTAHCALENDAR", payload: error.message })
    }
}

// Truck ready to dispatch
export const ChangeTruckColorUtahCalendar = (trucks, value, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/changeTruckColor`, { trucks, value, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Load ready to dispatch
export const ChangeLoadColorUtahCalendar = (load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/changeLoadColor`, { load, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "CHANEGED_LOAD_COLOR_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "CHANEGED_LOAD_COLOR_UTAHCALENDAR", payload: error.message })
    }
}

export const EditCalendarTextUtahCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/editCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "EDIT_CALENDAR_TEXT_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_CALENDAR_TEXT_UTAHCALENDAR", payload: error.message })
    }
}

export const AddCalendarTextUtahCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/addCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_CALENDAR_TEXT_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_CALENDAR_TEXT_UTAHCALENDAR", payload: error.message })
    }
}

export const DeleteCalendarTextUtahCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}utahCalendar/deleteCalendarText`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_CALENDAR_TEXT_UTAHCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETE_CALENDAR_TEXT_UTAHCALENDAR", payload: error.message })
    }
}