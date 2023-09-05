import { ToastHandler } from "../ToastHandler.js";


var InitState = {
    trailers: [],
    trailer: {},
    EditTrailerModal: false,
    EditTrailerTruckModal: false,
    ttrailers: [],
    ttrailersDialog:false
}

export const TrailerReducer = (state = InitState, action) => {

    switch (action.type) {
        case "ADD_TRAILER":
            ToastHandler(action.payload)

            return state;
        case "ADD_NEW_TRAILER":
            return { ...state, trailers: [...state.trailers, action.payload] };

        case "GET_TRAILERS":
            return { ...state, trailers: action.payload.msg };
        case "DELETE_TRAILER":
            ToastHandler(action.payload)

            const filtered = state.trailers.filter(trailer => trailer._id !== action.payload.trailer._id)
            return { ...state, trailers: filtered };
        case "EDIT_TRAILER_MODAL":
            const selected = state.trailers.filter(trailer => trailer._id === action.payload.id)
            return { ...state, EditTrailerModal: action.payload.open, trailer: selected.length !== 0 ? selected[0] : {} };
        case "EDIT_TRAILER_TRUCK_MODAL":
            const select = state.ttrailers.filter(ttrailer => ttrailer._id === action.payload.id)
            return { ...state, EditTrailerTruckModal: action.payload.open, ttrailer: select.length !== 0 ? select[0] : {} };
        case "EDIT_TRAILER":
            if(action.payload.status) {
                ToastHandler(action.payload)
                return {
                    ...state,
                    trailers: state.trailers.map(person => (person._id === action.payload.trailer._id) ? action.payload.trailer : person),
                };
            }else{
                ToastHandler(action.payload);
                return state;
            }
        case "ADD_TTRAILER":
            ToastHandler(action.payload)
            return state;
        case "EDIT_TTRAILER":
            ToastHandler(action.payload)
            return state;
        case "ADD_NEW_TTRAILER":
            const length = state.ttrailers.length;
            let temptrailer = action.payload;
            temptrailer.id = length + 1;
            return { ...state, ttrailers: [...state.ttrailers, temptrailer] };
        case "EDITED_TTRAILER":
            let editTrailers = state.ttrailers;
            editTrailers.forEach((item)=>{
                if(item._id === action.payload._id){
                    item.truck_num = action.payload.truck_num;
                    item.notes = action.payload.notes;
                    item.updatedAt = action.payload.updatedAt;
                }
            })
            return { ...state, ttrailers: editTrailers };
        case "GET_TTRAILERS":
            return { ...state, ttrailers: action.payload.msg };
        case "DELETE_TTRAILER":
            ToastHandler(action.payload)
            const filtered2 = state.ttrailers.filter(trailer => trailer._id !== action.payload.ttrailer._id);
            filtered2.forEach((item, index)=>{
                item.id = index + 1;
            })
            return { ...state, ttrailers: filtered2 };
        case "TTRAILER_DIALOG":
            return { ...state, ttrailersDialog: action.payload };
        default:
            return state;
    }
}



