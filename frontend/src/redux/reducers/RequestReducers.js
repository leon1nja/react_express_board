import {ToastHandler} from "../ToastHandler.js";


var InitState = {
    requests: [],
    request: {},
    matched: {},
    EditRequestModal: false
}

export const RequestReducer = (state = InitState, action) => {

    switch (action.type) {
        case "ADD_REQUEST":
            ToastHandler(action.payload)

            return state;
        case "ADD_NEW_REQUEST":
            // return { ...state, requests: state.requests.concat(action.payload) };
            return { ...state, requests: [action.payload, ...state.requests] };

        case "GET_REQUESTS":
            return { ...state, requests: action.payload.msg };
        case "DELETE_REQUEST":
            ToastHandler(action.payload)

            const filtered = state.requests.filter(request => request._id !== action.payload.request._id)
            return { ...state, requests: filtered };
        case "MATCH_REQUEST":
            return { ...state, matched: action.payload.truck };
        case "EDIT_REQUEST_MODAL":
            const selected = state.requests.filter(request => request._id === action.payload.id)
            return { ...state, EditRequestModal: action.payload.open, request: selected.length !== 0 ? selected[0] : {} };
        case "EDIT_REQUEST":
            ToastHandler(action.payload)

            return {
                ...state,
                requests: state.requests.map(person => (person._id === action.payload.request._id) ? action.payload.request : person),
            };
        default:
            return state;
    }
}



