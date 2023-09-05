import axios from 'axios'
import { toast } from 'react-toastify'

export const AddTruckListAction = (state, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}trucklist`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })
if(data.status){
    dispatch({ type: "ADD_TRUCK_LIST", payload: data })

}else{
    toast.info(data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
    } catch (error) {
        dispatch({ type: "ADD_TRUCK_LIST", payload: error.message })
    }
}
export const AddTrailerListAction = (state, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}trailerlist`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })
        if(data.status){
            dispatch({ type: "ADD_TRAILER_LIST", payload: data })
        
        }else{
            toast.info(data.msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({ type: "ADD_TRAILER_LIST", payload: error.message })
    }
}
export const AddVendorListAction = (state, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}vendor`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })
        if(data.status){
            dispatch({ type: "ADD_VENDOR_LIST", payload: data })
        
        }else{
            toast.info(data.msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({ type: "ADD_VENDOR_LIST", payload: error.message })
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

export const GetListsAction = (token) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}list`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "TRUCKS_TRAILERS_VENDORS", payload: data })

    } catch (error) {
        dispatch({ type: "TRUCKS_TRAILERS_VENDORS", payload: error.message })
    }
}


export const DeleteTruckListAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}trucklist?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_TRUCK_LIST", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_TRUCK_LIST", payload: { msg: error.message } })
    }
}
export const DeleteTrailerListAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}trailerlist?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_TRAILER_LIST", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_TRAILER_LIST", payload: { msg: error.message } })
    }
}
export const DeleteVendorListAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}vendor?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_VENDOR_LIST", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_VENDOR_LIST", payload: { msg: error.message } })
    }
}

export const DeleteLocationAction = (id, token) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_API}shedule?id=${id}`, {
            headers: {
                'Authorization': token,
            }
        })
        dispatch({ type: "DELETE_LOCATION_LIST", payload: data })

    } catch (error) {
        dispatch({ type: "DELETE_LOCATION_LIST", payload: { msg: error.message } })
    }
}
export const AddLocationListAction = (state, token) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}shedule`, { ...state }, {
            headers: {
                'Authorization': token,
            }
        })
        if(data.status){
            dispatch({ type: "ADD_LOCATION_LIST", payload: data })
        
        }else{
            toast.info(data.msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({ type: "ADD_LOCATION_LIST", payload: error.message })
    }
}