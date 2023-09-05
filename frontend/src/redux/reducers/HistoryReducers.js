import { ToastHandler } from "../ToastHandler.js";

var InitState = {
  historys: [],
  history: {},
  EditHistoryModal: false,
};

export const HistoryReducer = (state = InitState, action) => {
  switch (action.type) {
    case "ADD_HISTORY":
      ToastHandler(action.payload);

      return state;
    case "ADD_NEW_HISTORY":
      // return { ...state, historys: state.historys.concat(action.payload) };
      return { ...state, historys: [action.payload, ...state.historys] };

    case "GET_HISTORYS":
      return { ...state, historys: action.payload.msg };
    case "DELETE_HISTORY":
      ToastHandler(action.payload);
      let historys = state.historys;
      action.payload?.idArrBuf?.map((_id) => {
        historys = historys.filter((_history) => _history._id !== _id);
        return 0;
      });
      // debugger;
      !action.payload?.idArrBuf &&
        !!action.payload.history &&
        (historys = state.historys.filter(
          (history) => history._id !== action.payload.history._id
        ));
      return { ...state, historys: historys };
    case "EDIT_HISTORY_MODAL":
      const selected = state.historys.filter(
        (history) => history._id === action.payload.id
      );
      return {
        ...state,
        EditHistoryModal: action.payload.open,
        history: selected.length !== 0 ? selected[0] : {},
      };
    case "EDIT_HISTORY":
      ToastHandler(action.payload);

      return {
        ...state,
        historys: state.historys.map((person) =>
          person._id === action.payload.history._id
            ? action.payload.history
            : person
        ),
      };
    default:
      return state;
  }
};
