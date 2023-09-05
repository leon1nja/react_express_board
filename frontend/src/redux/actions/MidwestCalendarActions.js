import axios from 'axios';

// Add new row to the calendar
export const AddRowToMidwestCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/addRow`, { date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "NEW_CALENDAR_ROW_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "NEW_CALENDAR_ROW_MIDWESTCALENDAR", payload: error.message })
    }
}

// Get datas of one week for calendar
export const GetWeeklyMidwestCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/getInfosByDate`, { ...date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_INFOS_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "GET_INFOS_MIDWESTCALENDAR", payload: error.message })
    }
}

// Delete a row of calendar
export const DeleteRowMidwestCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/deleteRow?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "DELETED_ROW_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "DELETED_ROW_MIDWESTCALENDAR", payload: error.message })
    }
}

// Load dispatched action
export const LoadDispatchMidwestCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/loadDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Undispatched action
export const UnDispatchMidwestCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/unDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a truck 
export const DeleteTrucksInfoMidwestCalendar = (changedTrucks, deletedVaule, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/deleteTrucksInfo`, { changedTrucks, deletedVaule, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a load
export const DeleteLoadInfoMidwestCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/deleteLoadInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_INFO_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_INFO_MIDWESTCALENDAR", payload: error.message })
    }
}

// Delete a load info
export const DeleteLoadAddInfoMidwestCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/deleteLoadAddInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_ADDINFO_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_ADDINFO_MIDWESTCALENDAR", payload: error.message })
    }
}

// Drag and drop action
export const DragAndDropMidwestCalendar = (dragTrucks, dragId, dropTrucks, dropId, changedValue, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/dragAndDrop`, { dragTrucks, dragId, dropTrucks, changedValue, dropId }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Update or add truck
export const UpdateTrucksMidwestCalendar = (trucks, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/updateTrucks`, { trucks, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "UPDATED_TRUCKS_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "UPDATED_TRUCKS_MIDWESTCALENDAR", payload: error.message })
    }
}

// Add Truckinfo
export const AddTruckInfoMidwestCalendar = (truckInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/addTruckInfo`, { truckInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "ADDED_TRUCKINFO_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "ADDED_TRUCKINFO_MIDWESTCALENDAR", payload: error.message })
    }
}

// Add Loadinfo
export const AddLoadInfoMidwestCalendar = (LoadInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/addLoadInfo`, { LoadInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_LOADINFO_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_LOADINFO_MIDWESTCALENDAR", payload: error.message })
    }
}

// Update or add load
export const UpdateLoadMidwestCalendar = (load, date, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/updateLoad`, { load, date, id }, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "UPDATED_LOAD_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "UPDATED_LOAD_MIDWESTCALENDAR", payload: error.message })
    }
}

// Truck ready to dispatch
export const ChangeTruckColorMidwestCalendar = (trucks, value, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/changeTruckColor`, { trucks, value, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Load ready to dispatch
export const ChangeLoadColorMidwestCalendar = (load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/changeLoadColor`, { load, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "CHANEGED_LOAD_COLOR_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "CHANEGED_LOAD_COLOR_MIDWESTCALENDAR", payload: error.message })
    }
}

export const EditCalendarTextMidwestCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/editCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "EDIT_CALENDAR_TEXT_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_CALENDAR_TEXT_MIDWESTCALENDAR", payload: error.message })
    }
}

export const AddCalendarTextMidwestCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/addCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_CALENDAR_TEXT_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_CALENDAR_TEXT_MIDWESTCALENDAR", payload: error.message })
    }
}

export const DeleteCalendarTextMidwestCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}midwestCalendar/deleteCalendarText`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_CALENDAR_TEXT_MIDWESTCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETE_CALENDAR_TEXT_MIDWESTCALENDAR", payload: error.message })
    }
}