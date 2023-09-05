import {ToastHandler} from "../ToastHandler.js";
var InitState = {
    trucks: [],
    truck: {},
    EditModal: false,
}

export const TruckReducer = (state = InitState, action) => {

    switch (action.type) {
        case "ADD_TRUCK":
            ToastHandler(action.payload)
            return state;
        case "ADD_NEW_TRUCK":
            return { ...state, trucks: [ ...state.trucks,action.payload] };
        case "GET_TRUCKS":
            return { ...state, trucks: action.payload.msg };
        case "DELETE_TRUCK":
            ToastHandler(action.payload)
            const filtered = state.trucks.filter(truck => truck._id !== action.payload.truck._id)
            return { ...state, trucks: filtered };
        case "EDIT_MODAL":
            const selected = state.trucks.filter(truck => truck._id === action.payload.id)
            return { ...state, EditModal: action.payload.open, truck: selected.length !== 0 ? selected[0] : {} };
        case "EDIT_TRUCK":
            ToastHandler(action.payload)
            return {
                ...state,
                trucks: state.trucks.map(person => (person._id === action.payload.truck._id) ? action.payload.truck : person),
            };
        default:
            return state;
    }
}