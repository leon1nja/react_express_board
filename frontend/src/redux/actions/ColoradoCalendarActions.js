import axios from 'axios';

// Add new row to the calendar
export const AddRowToColoradoCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/addRow`, { date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "NEW_CALENDAR_ROW_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "NEW_CALENDAR_ROW_COLORADOCALENDAR", payload: error.message })
    }
}

// Get datas of one week for calendar
export const GetWeeklyColoradoCalendar = (date, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/getInfosByDate`, { ...date }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_INFOS_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "GET_INFOS_COLORADOCALENDAR", payload: error.message })
    }
}

// Delete a row of calendar
export const DeleteRowColoradoCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/deleteRow?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "DELETED_ROW_COLORADOCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "DELETED_ROW_COLORADOCALENDAR", payload: error.message })
    }
}

// Load dispatched action
export const LoadDispatchColoradoCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/loadDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Undispatched action
export const UnDispatchColoradoCalendar = (trucks, load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/unDispatch`, { trucks, load, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a truck 
export const DeleteTrucksInfoColoradoCalendar = (changedTrucks, deletedVaule, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/deleteTrucksInfo`, { changedTrucks, deletedVaule, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Delete a load
export const DeleteLoadInfoColoradoCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/deleteLoadInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_INFO_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_INFO_COLORADOCALENDAR", payload: error.message })
    }
}

// Delete a load info
export const DeleteLoadAddInfoColoradoCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/deleteLoadAddInfo`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_LOAD_ADDINFO_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETED_LOAD_ADDINFO_COLORADOCALENDAR", payload: error.message })
    }
}

// Drag and drop action
export const DragAndDropColoradoCalendar = (dragTrucks, dragId, dropTrucks, dropId, changedValue, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/dragAndDrop`, { dragTrucks, dragId, dropTrucks, changedValue, dropId }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Update or add truck
export const UpdateTrucksColoradoCalendar = (trucks, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/updateTrucks`, { trucks, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "UPDATED_TRUCKS_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "UPDATED_TRUCKS_COLORADOCALENDAR", payload: error.message })
    }
}

// Add Truckinfo
export const AddTruckInfoColoradoCalendar = (truckInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/addTruckInfo`, { truckInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADDED_TRUCKINFO_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADDED_TRUCKINFO_COLORADOCALENDAR", payload: error.message })
    }
}

// Add Loadinfo
export const AddLoadInfoColoradoCalendar = (LoadInfo, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/addLoadInfo`, { LoadInfo, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_LOADINFO_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_LOADINFO_COLORADOCALENDAR", payload: error.message })
    }
}

// Update or add load
export const UpdateLoadColoradoCalendar = (load, date, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/updateLoad`, { load, date, id }, {
            headers: {
                'Authorization': token,
            }
        })
        // dispatch({ type: "UPDATED_LOAD_COLORADOCALENDAR", payload: data })
    } catch (error) {
        // dispatch({ type: "UPDATED_LOAD_COLORADOCALENDAR", payload: error.message })
    }
}

// Truck ready to dispatch
export const ChangeTruckColorColoradoCalendar = (trucks, value, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/changeTruckColor`, { trucks, value, id }, {
            headers: {
                'Authorization': token,
            }
        })
    } catch (error) {
    }
}

// Load ready to dispatch
export const ChangeLoadColorColoradoCalendar = (load, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/changeLoadColor`, { load, id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "CHANEGED_LOAD_COLOR_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "CHANEGED_LOAD_COLOR_COLORADOCALENDAR", payload: error.message })
    }
}

export const EditCalendarTextColoradoCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/editCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "EDIT_CALENDAR_TEXT_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_CALENDAR_TEXT_COLORADOCALENDAR", payload: error.message })
    }
}

export const AddCalendarTextColoradoCalendar = (text, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/addCalendarText`, { text }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_CALENDAR_TEXT_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_CALENDAR_TEXT_COLORADOCALENDAR", payload: error.message })
    }
}

export const DeleteCalendarTextColoradoCalendar = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}coloradoCalendar/deleteCalendarText`, { id }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_CALENDAR_TEXT_COLORADOCALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "DELETE_CALENDAR_TEXT_COLORADOCALENDAR", payload: error.message })
    }
}