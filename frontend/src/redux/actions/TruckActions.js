import axios from 'axios'
export const AddTruckAction = (state, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}truck`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })

        dispatch({ type: "ADD_TRUCK", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_TRUCK", payload: error.message })
    }
}
export const EditTruckAction = (state, id, token) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_API}truck?id=${id}`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })

        dispatch({ type: "EDIT_TRUCK", payload: data })
    } catch (error) {
        dispatch({ type: "EDIT_TRUCK", payload: error.message })
    }
}

export const AddNewTruckAction = (data) => async (dispatch) => {
    try {

        dispatch({ type: "ADD_NEW_TRUCK", payload: data })
    } catch (error) {
        dispatch({ type: "ADD_NEW_TRUCK", payload: data })
    }
}

export const GetTrucksAction = (token) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}trucks`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "GET_TRUCKS", payload: data })

    } catch (error) {
        dispatch({ type: "GET_TRUCKS", payload: error.message })
    }
}


export const DeleteTruckAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}truck?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_TRUCK", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_TRUCK", payload: { msg: error.message } })
    }
}
