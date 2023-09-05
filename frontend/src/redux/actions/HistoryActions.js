import axios from 'axios'

export const AddHistoryAction = (state, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}history`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "ADD_HISTORY", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_HISTORY", payload: error.message })
    }
}
export const EditHistoryAction = (state, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_API}history?id=${id}`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })

        dispatch({ type: "EDIT_HISTORY", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_HISTORY", payload: error.message })
    }
}

export const AddNewHistoryAction = (data) => async (dispatch) => {
    try {

        dispatch({ type: "ADD_NEW_HISTORY", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_NEW_HISTORY", payload: data })
    }
}

export const GetHistorysAction = (token) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}historys`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_HISTORYS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_HISTORYS", payload: error.message })
    }
}


export const DeleteHistoryAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}history?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_HISTORY", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_HISTORY", payload: { msg: error.message } })
    }
}

export const RestoreHistoryAction = ( id, token) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}historyback?id=${id}`,{}, {
            headers: {
                'Authorization': token,
            }
        })

        dispatch({ type: "DELETE_HISTORY", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_HISTORY", payload: error.message })
    }
}
