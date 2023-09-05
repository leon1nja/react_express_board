import axios from 'axios'
export const AddCalendarAction = (state, token,socketId) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}calendar?socketId=${socketId}`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })

        dispatch({ type: "ADD_CALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_CALENDAR", payload: error.message })
    }
}
export const EditCalendarAction = (state, id, token,socketId) => async (dispatch) => {
    try {
         await axios.put(`${process.env.REACT_APP_BACKEND_API}calendar?id=${id}&socketId=${socketId}`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })

        // dispatch({ type: "EDIT_CALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_CALENDAR", payload: error.message })
    }
}

export const AddNewCalendarAction = (data) => async (dispatch) => {
    try {

        dispatch({ type: "ADD_NEW_CALENDAR", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_NEW_CALENDAR", payload: data })
    }
}

export const GetCalendarsAction = (token) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}calendars`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_CALENDARS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_CALENDARS", payload: error.message })
    }
}


export const DeleteCalendarAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}calendar?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_CALENDAR", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_CALENDAR", payload: { msg: error.message } })
    }
}
