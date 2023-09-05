import axios from 'axios'
export const AddRequestAction = (state, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}request`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })

        dispatch({ type: "ADD_REQUEST", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_REQUEST", payload: error.message })
    }
}
export const EditRequestAction = (state, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_API}request?id=${id}`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "EDIT_REQUEST", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_REQUEST", payload: error.message })
    }
}

export const AddNewRequestAction = (data) => async (dispatch) => {
    try {

        dispatch({ type: "ADD_NEW_REQUEST", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_NEW_REQUEST", payload: data })
    }
}

export const GetRequestsAction = (token) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}requests`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_REQUESTS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_REQUESTS", payload: error.message })
    }
}


export const DeleteRequestAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}request?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_REQUEST", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_REQUEST", payload: { msg: error.message } })
    }
}