import {ToastHandler} from "../ToastHandler.js";


var InitState = {
    Trucks: [],
    Trailers: [],
    Vendors: []

}

export const ListReducer = (state = InitState, action) => {

    switch (action.type) {
        case "TRUCKS_TRAILERS_VENDORS":
            return { ...state, Trucks: action.payload.Trucks, Trailers: action.payload.Trailers, Vendors: action.payload.Vendors }
        case "ADD_TRUCK_LIST":
            ToastHandler(action.payload)

            return { ...state, Trucks: [action.payload.truck,...state.Trucks]}
        case "ADD_TRAILER_LIST":
            ToastHandler(action.payload)

            return { ...state, Trailers: [action.payload.trailer,...state.Trailers]}
        case "ADD_VENDOR_LIST":
            ToastHandler(action.payload)

            return { ...state, Vendors: [action.payload.vendor,...state.Vendors]}
        case "DELETE_TRUCK_LIST":
            const filtered = state.Trucks.filter(truck => truck._id !== action.payload.truck._id)
            return { ...state, Trucks: filtered}
        case "DELETE_TRAILER_LIST":
            const filtered2 = state.Trailers.filter(trailer => trailer._id !== action.payload.trailer._id)
            return { ...state, Trailers: filtered2}
        case "DELETE_VENDOR_LIST":
            const filtered3 = state.Vendors.filter(vendor => vendor._id !== action.payload.vendor._id)
            return { ...state, Vendors: filtered3}
    
        default:
            return state
    }
}



