import axios from 'axios';

// Add new row to the calendar
export const AddRowToEastCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/addRow`, { date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "NEW_CALENDAR_ROW_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "NEW_CALENDAR_ROW_EASTCALENDAR", payload: error.message })
    }
}

// Get datas of one week for calendar
export const GetWeeklyEastCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/getInfosByDate`, { ...date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_INFOS_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "GET_INFOS_EASTCALENDAR", payload: error.message })
    }
}

// Delete a row of calendar
export const DeleteRowEastCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}eastCalendar/deleteRow?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "DELETED_ROW_EASTCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "DELETED_ROW_EASTCALENDAR", payload: error.message })
    }
}

// Load dispatched action
export const LoadDispatchEastCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/loadDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Undispatched action
export const UnDispatchEastCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/unDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a truck 
export const DeleteTrucksInfoEastCalendar = (changedTrucks, deletedVaule, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/deleteTrucksInfo`, { changedTrucks, deletedVaule, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a load
export const DeleteLoadInfoEastCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/deleteLoadInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_INFO_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_INFO_EASTCALENDAR", payload: error.message })
    }
}

// Delete a load info
export const DeleteLoadAddInfoEastCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/deleteLoadAddInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_ADDINFO_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_ADDINFO_EASTCALENDAR", payload: error.message })
    }
}

// Drag and drop action
export const DragAndDropEastCalendar = (dragTrucks, dragId, dropTrucks, dropId, changedValue, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/dragAndDrop`, { dragTrucks, dragId, dropTrucks, changedValue, dropId }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Update or add truck
export const UpdateTrucksEastCalendar = (trucks, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/updateTrucks`, { trucks, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "UPDATED_TRUCKS_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "UPDATED_TRUCKS_EASTCALENDAR", payload: error.message })
    }
}

// Add Truckinfo
export const AddTruckInfoEastCalendar = (truckInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/addTruckInfo`, { truckInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "ADDED_TRUCKINFO_EASTCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "ADDED_TRUCKINFO_EASTCALENDAR", payload: error.message })
    }
}

// Add Loadinfo
export const AddLoadInfoEastCalendar = (LoadInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/addLoadInfo`, { LoadInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_LOADINFO_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_LOADINFO_EASTCALENDAR", payload: error.message })
    }
}

// Update or add load
export const UpdateLoadEastCalendar = (load, date, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/updateLoad`, { load, date, id }, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "UPDATED_LOAD_EASTCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "UPDATED_LOAD_EASTCALENDAR", payload: error.message })
    }
}

// Truck ready to dispatch
export const ChangeTruckColorEastCalendar = (trucks, value, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/changeTruckColor`, { trucks, value, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Load ready to dispatch
export const ChangeLoadColorEastCalendar = (load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/changeLoadColor`, { load, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "CHANEGED_LOAD_COLOR_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "CHANEGED_LOAD_COLOR_EASTCALENDAR", payload: error.message })
    }
}

export const EditCalendarTextEastCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/editCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "EDIT_CALENDAR_TEXT_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_CALENDAR_TEXT_EASTCALENDAR", payload: error.message })
    }
}

export const AddCalendarTextEastCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/addCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_CALENDAR_TEXT_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_CALENDAR_TEXT_EASTCALENDAR", payload: error.message })
    }
}

export const DeleteCalendarTextEastCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}eastCalendar/deleteCalendarText`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_CALENDAR_TEXT_EASTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETE_CALENDAR_TEXT_EASTCALENDAR", payload: error.message })
    }
}