import { ToastHandler } from "../ToastHandler.js";

var InitState = {
  shedules: [],
  location: "",
  EditSheduleModal: false,
  shedule: {},
  field: "",
  id: "",
  EditLocationModal: false,
  id2: "",
  illinoises: [],
  tillinoises: [],
  tillinoise: {},
  coloradoses: [],
  EditExtraTruckModal: false,
  colorado: {},
  EditColoradoModal: false,
  EditColoradoTruckModal: false,
  midwestes: [],
  midwest: {},
  EditMidwestModal: false,
  illinois: {},
  EditIllinoisModal: false,
  tcoloradose: {},
  tcoloradoses: [],
  tcoloradosesDialog: false,
  tillinoisesDialog: false,
  // type: "",
  // trucks: [],
  // EditTruckModal: false,
  // EditLoadModal: false,
  // load: ""
};

export const DedicatedLaneReducer = (state = InitState, action) => {
  switch (action.type) {
    case "GET_SHEDULES":
      return { ...state, shedules: action.payload.msg };
    case "EDIT_LOCATION_MODAL":
      return {
        ...state,
        location: action.payload.obj.location,
        EditLocationModal: action.payload.open,
        id2: action.payload.obj._id,
      };
    case "EDIT_SHEDULE_MODAL":
      return {
        ...state,
        EditSheduleModal: action.payload.open,
        shedule: action.payload.data,
        field: action.payload.field,
        id: action.payload.id,
      };
    case "EDIT_SHEDULE":
      ToastHandler(action.payload);

      return {
        ...state,
        shedules: state.shedules.map((person) =>
          person._id === action.payload.shedule._id
            ? action.payload.shedule
            : person
        ),
      };
    case "ADD_LOCATION_LIST":
      ToastHandler(action.payload);

      return {
        ...state,
        shedules: [action.payload.shedule, ...state.shedules],
      };
    case "DELETE_LOCATION_LIST":
      const filtered = state.shedules.filter(
        (shedule) => shedule._id !== action.payload.shedule._id
      );
      return { ...state, shedules: filtered };
    case "GET_ILLINOIS":
      return { ...state, illinoises: action.payload.msg };
    case "GET_TILLINOIS":
      return { ...state, tillinoises: action.payload.msg };
    case "ADD_ILLINOIS":
      ToastHandler(action.payload);

      return state;
    case "ADD_NEW_ILLINOIS":
      return { ...state, illinoises: [...state.illinoises, action.payload] };
    case "ADD_TILLINOIS":
      ToastHandler(action.payload);

      return state;
    case "ADD_NEW_TILLINOIS":
      return { ...state, tillinoises: [...state.tillinoises, action.payload] };
    case "DELETE_ILLINOIS":
      ToastHandler(action.payload);

      const filtered1 = state.illinoises.filter(
        (illinois) => illinois._id !== action.payload.illinois._id
      );
      return { ...state, illinoises: filtered1 };
    case "DELETE_TILLINOIS":
      ToastHandler(action.payload);

      const filtered2 = state.tillinoises.filter(
        (tillinois) => tillinois._id !== action.payload.tillinois._id
      );
      return { ...state, tillinoises: filtered2 };
    case "TILLINOIS_DIALOG":
      return { ...state, tillinoisesDialog: action.payload };
    case "ADD_COLORADO":
      ToastHandler(action.payload);

      return state;
    case "ADD_NEW_COLORADO":
      return { ...state, coloradoses: [...state.coloradoses, action.payload] };

    case "GET_COLORADOSES":
      return { ...state, coloradoses: action.payload.msg };
    case "DELETE_COLORADO":
      ToastHandler(action.payload);

      const del = state.coloradoses.filter(
        (colorado) => colorado._id !== action.payload.colorado._id
      );
      return { ...state, coloradoses: del };
    case "EDIT_COLORADO_MODAL":
      const selected = state.coloradoses.filter(
        (colorado) => colorado._id === action.payload.id
      );
      return {
        ...state,
        EditColoradoModal: action.payload.open,
        colorado: selected.length !== 0 ? selected[0] : {},
      };
    case "EDIT_COLORADO_TRUCK_MODAL":
      const select = state.tcoloradoses.filter(
        (colorado) => colorado._id === action.payload.id
      );
      return {
        ...state,
        EditColoradoTruckModal: action.payload.open,
        tcoloradose: select.length !== 0 ? select[0] : {},
      };
    case "EDIT_COLORADO":
      if(action.payload.status) {
          ToastHandler(action.payload)
          return {
            ...state,
            coloradoses: state.coloradoses.map((person) =>
              person._id === action.payload.colorado._id
                ? action.payload.colorado
                : person
            ),
          };
      }else{
          ToastHandler(action.payload);
          return state;
      }
    case "ADD_MIDWEST":
      ToastHandler(action.payload);

      return state;
    case "ADD_NEW_MIDWEST":
      return { ...state, midwestes: [...state.midwestes, action.payload] };

    case "GET_MIDWESTES":
      return { ...state, midwestes: action.payload.msg };
    case "DELETE_MIDWEST":
      ToastHandler(action.payload);

      const del2 = state.midwestes.filter(
        (midwest) => midwest._id !== action.payload.midwest._id
      );
      return { ...state, midwestes: del2 };
    case "EDIT_MIDWEST_MODAL":
      const selected1 = state.midwestes.filter(
        (midwest) => midwest._id === action.payload.id
      );
      return {
        ...state,
        EditMidwestModal: action.payload.open,
        midwest: selected1.length !== 0 ? selected1[0] : {},
      };

    case "EDIT_EXTRA_TRUCK_MODAL":
      const selectedExtraTruck = state.tillinoises.filter(
        (tillinoise) => tillinoise._id === action.payload.id
      );
      return {
        ...state,
        EditExtraTruckModal: action.payload.open,
        tillinoise:
          selectedExtraTruck.length !== 0 ? selectedExtraTruck[0] : {},
      };
    case "EDIT_TILLINOIS":
      ToastHandler(action.payload);

      return {
        ...state,
        tillinoises: action.payload.tillinoises
          ? action.payload.tillinoises
          : state.tillinoises,
      };
    case "EDIT_MIDWEST":
      if(action.payload.status) {
        ToastHandler(action.payload)
        return {
          ...state,
          midwestes: state.midwestes.map((person) =>
            person._id === action.payload.midwest._id
              ? action.payload.midwest
              : person
          ),
        };
      }else{
          ToastHandler(action.payload);
          return state;
      }
    case "EDIT_ILLINOIS_MODAL":
      const selected2 = state.illinoises.filter(
        (midwest) => midwest._id === action.payload.id
      );
      return {
        ...state,
        EditIllinoisModal: action.payload.open,
        illinois: selected2.length !== 0 ? selected2[0] : {},
      };
    case "EDIT_ILLINOIS":
      if(action.payload.status) {
        ToastHandler(action.payload)
        return {
          ...state,
          illinoises: state.illinoises.map((person) =>
            person._id === action.payload.illinois._id
              ? action.payload.illinois
              : person
          ),
        };
      }else{
          ToastHandler(action.payload);
          return state;
      }
    case "ADD_TCOLORADO":
      ToastHandler(action.payload);
      return state;
    case "EDIT_TCOLORADO":
      ToastHandler(action.payload);
      return state;
    case "ADD_NEW_TCOLORADO":
      const length = state.tcoloradoses.length;
      let temptrailer = action.payload;
      temptrailer.id = length + 1;
      return {
        ...state,
        tcoloradoses: [...state.tcoloradoses, temptrailer],
      };
    case "EDITED_TCOLORADO":
      let editTrailers = state.tcoloradoses;
      editTrailers.forEach((item)=>{
          if(item._id === action.payload._id){
              item.truck_num = action.payload.truck_num;
              item.notes = action.payload.notes;
              item.updatedAt = action.payload.updatedAt;
          }
      })
      return { ...state, tcoloradoses: editTrailers };
    case "GET_TCOLORADOSES":
      return { ...state, tcoloradoses: action.payload.msg };
    case "DELETE_TCOLORADO":
      ToastHandler(action.payload);
      const filtered3 = state.tcoloradoses.filter(
        (trailer) => trailer._id !== action.payload.tcolorado._id
      );
      filtered3.forEach((item, index)=>{
        item.id = index + 1;
      })
      return { ...state, tcoloradoses: filtered3 };
    case "TCOLORADO_DIALOG":
      return { ...state, tcoloradosesDialog: action.payload };
    default:
      return state;
  }
};
