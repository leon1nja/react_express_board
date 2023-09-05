import { combineReducers } from "redux";
import {UserReg} from "./reducers/AuthReducers";
import {TruckReducer} from "./reducers/TruckReducers";
import {TrailerReducer} from "./reducers/TrailerReducers";
import {HistoryReducer} from "./reducers/HistoryReducers";
import {RequestReducer} from "./reducers/RequestReducers";
import {ListReducer} from "./reducers/ListReducers";
import { DedicatedLaneReducer } from "./reducers/DedicatedLaneReducer";
import { CalendarReducer } from "./reducers/CalendarReducers";
import { UtahCalendarReducer } from "./reducers/UtahCalendarReducers";
import { ColoradoCalendarReducer } from "./reducers/ColoradoCalendarReducers";
import { MidwestCalendarReducer } from "./reducers/MidwestCalendarReducers";
import { EastCalendarReducer } from "./reducers/EastCalendarReducers";

const rootReducer=combineReducers({
    UserReg,
    TruckReducer,
    TrailerReducer,
    HistoryReducer,
    RequestReducer,
    ListReducer,
    DedicatedLaneReducer,
    CalendarReducer,
    UtahCalendarReducer,
    ColoradoCalendarReducer,
    MidwestCalendarReducer,
    EastCalendarReducer
})

export default rootReducer