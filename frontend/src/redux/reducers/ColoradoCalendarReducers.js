import { changeDateType } from "../../functionLib/index.js";
import {ToastHandler} from "../ToastHandler.js";

var InitState = {
    weeklyCalendarInfos: [],
    EditTruckModal: false,
    type: "",
    trucks: [],
    EditLoadModal: false,
    load: "",
    date: "",
    calendarTexts: [],
    EditNotepadModal: false,
    calendarText: {},
    id: ""
}

export const ColoradoCalendarReducer = (state = InitState, action) => {

    switch (action.type) {
        case "GET_INFOS_COLORADOCALENDAR":
            action.payload.calendarInfos?.forEach((item)=>{
                changeDateType(item);
            });
            return { ...state, weeklyCalendarInfos: action.payload.calendarInfos, calendarTexts: action.payload.calendarText };

        case "ADD_TRUCKS_NEWROW_COLORADOCALENDAR":
            return { ...state, trucks: action.payload.trucks };

        case "ADD_LOAD_NEWROW_COLORADOCALENDAR":
            return { ...state, load: action.payload.load };

        case "NEW_WEEKLYCALENDAR_ROW_COLORADOCALENDAR":
            changeDateType(action.payload.newRow);
            let addedCalendar = [];
            state.weeklyCalendarInfos.forEach((item)=>{
                addedCalendar.push(item);
            })
            addedCalendar.push(action.payload.newRow);
            return { ...state, weeklyCalendarInfos: addedCalendar };

        case "DELETED_ROW_COLORADOCALENDAR":
            let del = state.weeklyCalendarInfos.filter(
                (info) => info._id !== action.payload.deletedRow._id
              );
            return { ...state, weeklyCalendarInfos: del };

        case "DISPATCHED_LOAD_COLORADOCALENDAR":
            changeDateType(action.payload.dispatchedInfos);
            let dispatch = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.dispatchedInfos._id) dispatch.push(info);
                else {
                    dispatch.push(action.payload.dispatchedInfos);
                }
            })
            return { ...state, weeklyCalendarInfos: dispatch };

        case "UNDISPATCHED_COLORADOCALENDAR":
            changeDateType(action.payload.dispatchedInfos);
            let undispatch = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.dispatchedInfos._id) undispatch.push(info);
                else {
                    undispatch.push(action.payload.dispatchedInfos);
                }
            })
            return { ...state, weeklyCalendarInfos: undispatch };

        case "DELETED_TRUCKS_INFO_COLORADOCALENDAR":
            changeDateType(action.payload.changedInfos);
            let truckChanged = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.changedInfos._id) truckChanged.push(info);
                else {
                    truckChanged.push(action.payload.changedInfos);
                }
            })
            return { ...state, weeklyCalendarInfos: truckChanged };

        case "DELETED_LOAD_INFO_COLORADOCALENDAR":
            changeDateType(action.payload.changedInfos);
            let loadChanged = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.changedInfos._id) loadChanged.push(info);
                else {
                    loadChanged.push(action.payload.changedInfos);
                }
            })
            return { ...state, weeklyCalendarInfos: loadChanged };

        case "DELETED_LOAD_ADDINFO_COLORADOCALENDAR":
                changeDateType(action.payload.changedInfos);
                let loadInfoChanged = [];
                state.weeklyCalendarInfos.forEach((info)=>{
                    if(info._id !== action.payload.changedInfos._id) loadInfoChanged.push(info);
                    else {
                        loadInfoChanged.push(action.payload.changedInfos);
                    }
                })
                return { ...state, weeklyCalendarInfos: loadInfoChanged };

        case "DRAG_AND_DROP_COLORADOCALENDAR":
            changeDateType(action.payload.dragCell);
            changeDateType(action.payload.dropCell);
            let dragAndDrop = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.dragCell._id && info._id !== action.payload.dropCell._id ) dragAndDrop.push(info);
                else if(info._id === action.payload.dragCell._id) {
                    dragAndDrop.push(action.payload.dragCell);
                } else {
                    dragAndDrop.push(action.payload.dropCell);
                }
            })
            return { ...state, weeklyCalendarInfos: dragAndDrop };

        case "UPDATED_TRUCKS_COLORADOCALENDAR":
            changeDateType(action.payload.updatedTrucks);
            let updatedByTrucks = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.updatedTrucks._id) updatedByTrucks.push(info);
                else {
                    updatedByTrucks.push(action.payload.updatedTrucks);
                }
            })
            return { ...state, weeklyCalendarInfos: updatedByTrucks };

        case "ADDED_TRUCKINFO_COLORADOCALENDAR":
            changeDateType(action.payload.updatedTrucks);
            let updatedByTruckinfo = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.updatedTrucks._id) updatedByTruckinfo.push(info);
                else {
                    updatedByTruckinfo.push(action.payload.updatedTrucks);
                }
            })
            return { ...state, weeklyCalendarInfos: updatedByTruckinfo };

        case "ADDED_LOADINFO_COLORADOCALENDAR":
            changeDateType(action.payload.updatedLoad);
            let updatedByLoadinfo = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.updatedLoad._id) updatedByLoadinfo.push(info);
                else {
                    updatedByLoadinfo.push(action.payload.updatedLoad);
                }
            })
            return { ...state, weeklyCalendarInfos: updatedByLoadinfo };

        case "ADD_LOADINFO_COLORADOCALENDAR":
            ToastHandler(action.payload)
            return state;

        case "UPDATED_LOAD_COLORADOCALENDAR":
            changeDateType(action.payload.updatedLoad);
            let updatedByLoad = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.updatedLoad._id) updatedByLoad.push(info);
                else {
                    updatedByLoad.push(action.payload.updatedLoad);
                }
            })
            return { ...state, weeklyCalendarInfos: updatedByLoad };

        case "CHANEGED_TRUCK_COLOR_COLORADOCALENDAR":
            changeDateType(action.payload.updatedTrucks);
            let changedByTrucksInfos = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.updatedTrucks._id) changedByTrucksInfos.push(info);
                else {
                    changedByTrucksInfos.push(action.payload.updatedTrucks);
                }
            })
            return { ...state, weeklyCalendarInfos: changedByTrucksInfos };

        case "CHANEGED_LOAD_COLOR_COLORADOCALENDAR":
            changeDateType(action.payload.updatedLoad);
            let changedByLoadInfos = [];
            state.weeklyCalendarInfos.forEach((info)=>{
                if(info._id !== action.payload.updatedLoad._id) changedByLoadInfos.push(info);
                else {
                    changedByLoadInfos.push(action.payload.updatedLoad);
                }
            })
            return { ...state, weeklyCalendarInfos: changedByLoadInfos };

        case "EDIT_CALENDAR_TEXT_COLORADOCALENDAR":
            return { ...state, calendarTexts: action.payload.calendarText };
            
        case "ADD_CALENDAR_TEXT_COLORADOCALENDAR":
            return { ...state, calendarTexts: action.payload.calendarText };

        case "DELETE_CALENDAR_TEXT_COLORADOCALENDAR":
            return { ...state, calendarTexts: action.payload.calendarText };
    
        case "EDIT_TRUCK_MODAL_COLORADOCALENDAR":
            return {
                ...state,
                EditTruckModal: action.payload.open,
                trucks: action.payload.trucks,
                type: action.payload.type,
                date: action.payload.date
            };

        case "EDIT_LOAD_MODAL_COLORADOCALENDAR":
            return {
                ...state,
                EditLoadModal: action.payload.open,
                load: action.payload.load,
                type: action.payload.type,
                date: action.payload.date
            };
            
        case "EDIT_COLORADONOTEPAD_MODAL":
            const selected = state.calendarTexts.filter(
                (calendarText) => calendarText._id === action.payload.id
              );
            return {
                ...state,
                EditNotepadModal: action.payload.open,
                calendarText: selected.length !== 0 ? selected[0] : {},
            };
                
        default:
            return state;
    }
}



