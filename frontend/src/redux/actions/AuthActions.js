import axios from 'axios'
export const UserRegAction = (state) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}register`, { ...state },{headers: {
           "Content-Type": "multipart/form-data",
     }})
        dispatch({ type: "USER_REG", payload: data })
    } catch (error) {
        dispatch({ type: "USER_REG", payload: error.message })
    }
}

export const UserLogAction = (state) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}login`, { ...state })
        dispatch({ type: "USER_LOG", payload: data })
        if (data.status) {
            localStorage.setItem("token", data.token)
        }
    } catch (error) {
        dispatch({ type: "USER_LOG", payload: error.message })
    }
}
export const NotificationActions = (token,search) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}notifications`, { search }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "NOTIFICATION", payload: data })
     
    } catch (error) {
        dispatch({ type: "NOTIFICATION", payload: error.message })
    }
}
export const DeleteNotifications = (delId, searchInfo, token) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}notifications/delete`, { delId, searchInfo }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETED_ACTIONLOGS", payload: data })
     
    } catch (error) {
        dispatch({ type: "DELETED_ACTIONLOGS", payload: error.message })
    }
}

export const GetUsers = () => async (dispatch) => {
    try {

        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}users`)
        dispatch({ type: "USERS", payload: data })
    } catch (error) {
        dispatch({ type: "USERS", payload: error.message })
    }
}
export const DeleteUser = (id,token) => async (dispatch) => {
    try {

        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}user?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "USER_DELETE", payload: data })
    } catch (error) {
        dispatch({ type: "USER_DELETE", payload: error.message })
    }
}

export const GetLogicActions = (token) => async (dispatch) => {
    try {

        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}logics`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "LOGICS", payload: data.msg })
     
    } catch (error) {
        dispatch({ type: "LOGICS", payload: error.message })
    }
}