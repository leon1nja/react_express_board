import "./style/app.scss";
import Login from "./pages/login/Login";
import Dedicatedlist from "./pages/list/DedicatedList";
import UtahTrailerList from "./pages/list/UtahTrailerList";
import MidwestEastCalendars from "./pages/list/MidwestEastCalendars";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs, loginInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { AddNewTruckAction } from "./redux/actions/TruckActions";
import io from "socket.io-client";
import History from "./pages/history/History";
import Request from "./pages/request/Request";

import {
  AddNewTrailerAction,
  AddNewTTrailerAction,
  EditTTrailerAction
} from "./redux/actions/TrailerActions";
import { AddNewHistoryAction } from "./redux/actions/HistoryActions";
import { AddNewRequestAction } from "./redux/actions/RequestAction";
import Setting from "./pages/settings/Settings";
import { GetListsAction } from "./redux/actions/ListActions";
import {
  AddNewColoradoAction,
  AddNewIllinoisAction,
  AddNewMidwestAction,
  AddNewTColoradoAction,
  AddNewTIllinoisAction,
} from "./redux/actions/DedicatedLaneActions";
import Calendar from "./pages/list/UtahCalendar";
import { AddNewCalendarAction } from "./redux/actions/CalendarActions";
import {
  GetLogicActions,
} from "./redux/actions/AuthActions";
import Actionlog from "./components/Actionlog";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { LogStatus, token } = useSelector((state) => state.UserReg);
  const dispatch = useDispatch();

  //User Login Checking
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "USER_LOG_BACK", payload: { token } });
      dispatch(GetLogicActions(token));
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [token]);
  useEffect(() => {
    if (LogStatus) {
      dispatch(GetListsAction(token));
    }
  }, [LogStatus]);

  //Socket Connections
  useEffect(() => {
    const socket = io.connect(process.env.REACT_APP_BACKEND_API);
    var id = "";
    socket.on("connect", () => {
      id = socket.id;
      dispatch({ type: "SOCKET_ID", payload: socket.id });
    });

    socket.on("NEW_NOTIFICATION", (notifications) => {
      dispatch({ type: "NEW_NOTIFICATION", payload: notifications });
    });
    socket.on("DELETED_ACTIONLOGS", (notifications) => {
      dispatch({ type: "DELETED_ACTIONLOGS", payload: notifications });
    });
    socket.on("NEW_TRUCK", (obj) => {
      dispatch(AddNewTruckAction(obj));
    });
    socket.on("DELETED_TRUCK", (deleted) => {
      dispatch({ type: "DELETE_TRUCK", payload: deleted });
    });
    socket.on("EDITED_TRUCK", (deleted) => {
      dispatch({ type: "EDIT_TRUCK", payload: deleted });
    });
    socket.on("NEW_TRAILER", (obj) => {
      dispatch(AddNewTrailerAction(obj));
    });
    socket.on("DELETED_TRAILER", (deleted) => {
      dispatch({ type: "DELETE_TRAILER", payload: deleted });
    });
    socket.on("EDITED_TRAILER", (deleted) => {
      dispatch({ type: "EDIT_TRAILER", payload: deleted });
    });
    socket.on("NEW_HISTORY", (obj) => {
      dispatch(AddNewHistoryAction(obj));
    });
    socket.on("DELETED_HISTORY", (deleted) => {
      dispatch({ type: "DELETE_HISTORY", payload: deleted });
    });
    socket.on("EDIT_ILLINOIS_TRUCK", (tillinoises) => {
      dispatch({ type: "EDIT_TILLINOIS", payload: tillinoises });
    });
    socket.on("NEW_REQUEST", (obj) => {
      dispatch(AddNewRequestAction(obj));
    });
    socket.on("DELETED_REQUEST", (deleted) => {
      dispatch({ type: "DELETE_REQUEST", payload: deleted });
    });
    socket.on("EDITED_REQUEST", (deleted) => {
      dispatch({ type: "EDIT_REQUEST", payload: deleted });
    });
    socket.on("EDITED_SHEDULE", (deleted) => {
      dispatch({ type: "EDIT_SHEDULE", payload: deleted });
    });
    socket.on("NEW_ILLINOIS", (obj) => {
      dispatch(AddNewIllinoisAction(obj));
    });
    socket.on("EDITED_ILLINOIS", (deleted) => {
      dispatch({ type: "EDIT_ILLINOIS", payload: deleted });
    });
    socket.on("DELETED_ILLINOIS", (deleted) => {
      dispatch({ type: "DELETE_ILLINOIS", payload: deleted });
    });
    socket.on("NEW_TILLINOIS", (obj) => {
      dispatch(AddNewTIllinoisAction(obj));
    });
    socket.on("DELETED_TILLINOIS", (deleted) => {
      dispatch({ type: "DELETE_TILLINOIS", payload: deleted });
    });
    socket.on("NEW_COLORADO", (obj) => {
      dispatch(AddNewColoradoAction(obj));
    });
    socket.on("DELETED_COLORADO", (deleted) => {
      dispatch({ type: "DELETE_COLORADO", payload: deleted });
    });
    socket.on("EDITED_COLORADO", (deleted) => {
      dispatch({ type: "EDIT_COLORADO", payload: deleted });
    });
    socket.on("NEW_MIDWEST", (obj) => {
      dispatch(AddNewMidwestAction(obj));
    });
    socket.on("DELETED_MIDWEST", (deleted) => {
      dispatch({ type: "DELETE_MIDWEST", payload: deleted });
    });
    socket.on("EDITED_MIDWEST", (deleted) => {
      dispatch({ type: "EDIT_MIDWEST", payload: deleted });
    });
    socket.on("NEW_CALENDAR", (deleted) => {
      if (deleted.user !== id) {
        return dispatch(AddNewCalendarAction(deleted.calendar));
      } else if (deleted.user === "undefined") {
        return dispatch(AddNewCalendarAction(deleted.calendar));
      } else if (!deleted.user) {
        return dispatch(AddNewCalendarAction(deleted.calendar));
      } else {
        return dispatch(AddNewCalendarAction(deleted.calendar));
      }
    });
    socket.on("DELETED_CALENDAR", (deleted) => {
      dispatch({ type: "DELETE_CALENDAR", payload: deleted });
    });
    socket.on("EDITED_CALENDAR", (deleted) => {
      if (deleted.user !== id) {
        return dispatch({ type: "EDIT_CALENDAR", payload: deleted });
      } else if (deleted.user === "undefined") {
        return null;
      } else if (!deleted.user) {
        return null;
      } else {
        return null;
      }
    });
    socket.on("NEW_TTRAILER", (obj) => {
      dispatch(AddNewTTrailerAction(obj));
    });
    socket.on("EDITED_TTRAILER", (obj) => {
      dispatch({ type: "EDITED_TTRAILER", payload: obj });
    });
    socket.on("DELETED_TTRAILER", (deleted) => {
      dispatch({ type: "DELETE_TTRAILER", payload: deleted });
    });
    socket.on("NEW_TCOLORADO", (obj) => {
      dispatch(AddNewTColoradoAction(obj));
    });
    socket.on("EDITED_TCOLORADO", (obj) => {
      dispatch({ type: "EDITED_TCOLORADO", payload: obj });
    });
    socket.on("DELETED_TCOLORADO", (deleted) => {
      dispatch({ type: "DELETE_TCOLORADO", payload: deleted });
    });
    socket.on("DELETED_ROW_UTAHCALENDAR", (obj) => {
      dispatch({ type: "DELETED_ROW_UTAHCALENDAR", payload: obj });
    });
    socket.on("DISPATCHED_LOAD_UTAHCALENDAR", (obj) => {
      dispatch({ type: "DISPATCHED_LOAD_UTAHCALENDAR", payload: obj });
    });
    socket.on("UNDISPATCHED_UTAHCALENDAR", (obj) => {
      dispatch({ type: "UNDISPATCHED_UTAHCALENDAR", payload: obj });
    });
    socket.on("UNDISPATCHED_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "UNDISPATCHED_COLORADOCALENDAR", payload: obj });
    });
    socket.on("UNDISPATCHED_EASTCALENDAR", (obj) => {
      dispatch({ type: "UNDISPATCHED_EASTCALENDAR", payload: obj });
    });
    socket.on("UNDISPATCHED_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "UNDISPATCHED_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DELETED_TRUCKS_INFO_UTAHCALENDAR", (obj) => {
      dispatch({ type: "DELETED_TRUCKS_INFO_UTAHCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_INFO_UTAHCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_INFO_UTAHCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_ADDINFO_UTAHCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_ADDINFO_UTAHCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_ADDINFO_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_ADDINFO_COLORADOCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_ADDINFO_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_ADDINFO_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_ADDINFO_EASTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_ADDINFO_EASTCALENDAR", payload: obj });
    });
    socket.on("DRAG_AND_DROP_UTAHCALENDAR", (obj) => {
      dispatch({ type: "DRAG_AND_DROP_UTAHCALENDAR", payload: obj });
    });
    socket.on("UPDATED_TRUCKS_UTAHCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_TRUCKS_UTAHCALENDAR", payload: obj });
    });
    socket.on("ADDED_TRUCKINFO_UTAHCALENDAR", (obj) => {
      dispatch({ type: "ADDED_TRUCKINFO_UTAHCALENDAR", payload: obj });
    });
    socket.on("ADDED_LOADINFO_UTAHCALENDAR", (obj) => {
      dispatch({ type: "ADDED_LOADINFO_UTAHCALENDAR", payload: obj });
    });
    socket.on("ADDED_TRUCKINFO_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "ADDED_TRUCKINFO_COLORADOCALENDAR", payload: obj });
    });
    socket.on("ADDED_LOADINFO_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "ADDED_LOADINFO_COLORADOCALENDAR", payload: obj });
    });
    socket.on("ADDED_TRUCKINFO_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "ADDED_TRUCKINFO_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("ADDED_LOADINFO_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "ADDED_LOADINFO_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("ADDED_TRUCKINFO_EASTCALENDAR", (obj) => {
      dispatch({ type: "ADDED_TRUCKINFO_EASTCALENDAR", payload: obj });
    });
    socket.on("ADDED_LOADINFO_EASTCALENDAR", (obj) => {
      dispatch({ type: "ADDED_LOADINFO_EASTCALENDAR", payload: obj });
    });
    socket.on("UPDATED_LOAD_UTAHCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_LOAD_UTAHCALENDAR", payload: obj });
    });
    socket.on("NEW_WEEKLYCALENDAR_ROW_UTAHCALENDAR", (obj) => {
      dispatch({ type: "NEW_WEEKLYCALENDAR_ROW_UTAHCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_TRUCK_COLOR_UTAHCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_TRUCK_COLOR_UTAHCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_LOAD_COLOR_UTAHCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_LOAD_COLOR_UTAHCALENDAR", payload: obj });
    });
    socket.on("DELETED_ROW_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "DELETED_ROW_COLORADOCALENDAR", payload: obj });
    });
    socket.on("DISPATCHED_LOAD_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "DISPATCHED_LOAD_COLORADOCALENDAR", payload: obj });
    });
    socket.on("DELETED_TRUCKS_INFO_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "DELETED_TRUCKS_INFO_COLORADOCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_INFO_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_INFO_COLORADOCALENDAR", payload: obj });
    });
    socket.on("DRAG_AND_DROP_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "DRAG_AND_DROP_COLORADOCALENDAR", payload: obj });
    });
    socket.on("UPDATED_TRUCKS_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_TRUCKS_COLORADOCALENDAR", payload: obj });
    });
    socket.on("UPDATED_LOAD_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_LOAD_COLORADOCALENDAR", payload: obj });
    });
    socket.on("NEW_WEEKLYCALENDAR_ROW_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "NEW_WEEKLYCALENDAR_ROW_COLORADOCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_TRUCK_COLOR_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_TRUCK_COLOR_COLORADOCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_LOAD_COLOR_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_LOAD_COLOR_COLORADOCALENDAR", payload: obj });
    });
    socket.on("DELETED_ROW_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_ROW_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DISPATCHED_LOAD_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "DISPATCHED_LOAD_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DELETED_TRUCKS_INFO_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_TRUCKS_INFO_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_INFO_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_INFO_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DRAG_AND_DROP_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "DRAG_AND_DROP_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("UPDATED_TRUCKS_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_TRUCKS_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("UPDATED_LOAD_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_LOAD_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("NEW_WEEKLYCALENDAR_ROW_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "NEW_WEEKLYCALENDAR_ROW_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_TRUCK_COLOR_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_TRUCK_COLOR_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_LOAD_COLOR_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_LOAD_COLOR_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DELETED_ROW_EASTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_ROW_EASTCALENDAR", payload: obj });
    });
    socket.on("DISPATCHED_LOAD_EASTCALENDAR", (obj) => {
      dispatch({ type: "DISPATCHED_LOAD_EASTCALENDAR", payload: obj });
    });
    socket.on("DELETED_TRUCKS_INFO_EASTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_TRUCKS_INFO_EASTCALENDAR", payload: obj });
    });
    socket.on("DELETED_LOAD_INFO_EASTCALENDAR", (obj) => {
      dispatch({ type: "DELETED_LOAD_INFO_EASTCALENDAR", payload: obj });
    });
    socket.on("DRAG_AND_DROP_EASTCALENDAR", (obj) => {
      dispatch({ type: "DRAG_AND_DROP_EASTCALENDAR", payload: obj });
    });
    socket.on("UPDATED_TRUCKS_EASTCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_TRUCKS_EASTCALENDAR", payload: obj });
    });
    socket.on("UPDATED_LOAD_EASTCALENDAR", (obj) => {
      dispatch({ type: "UPDATED_LOAD_EASTCALENDAR", payload: obj });
    });
    socket.on("NEW_WEEKLYCALENDAR_ROW_EASTCALENDAR", (obj) => {
      dispatch({ type: "NEW_WEEKLYCALENDAR_ROW_EASTCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_TRUCK_COLOR_EASTCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_TRUCK_COLOR_EASTCALENDAR", payload: obj });
    });
    socket.on("CHANEGED_LOAD_COLOR_EASTCALENDAR", (obj) => {
      dispatch({ type: "CHANEGED_LOAD_COLOR_EASTCALENDAR", payload: obj });
    });
    socket.on("EDIT_CALENDAR_TEXT_UTAHCALENDAR", (obj) => {
      dispatch({ type: "EDIT_CALENDAR_TEXT_UTAHCALENDAR", payload: obj });
    });
    socket.on("EDIT_CALENDAR_TEXT_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "EDIT_CALENDAR_TEXT_COLORADOCALENDAR", payload: obj });
    });
    socket.on("EDIT_CALENDAR_TEXT_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "EDIT_CALENDAR_TEXT_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("EDIT_CALENDAR_TEXT_EASTCALENDAR", (obj) => {
      dispatch({ type: "EDIT_CALENDAR_TEXT_EASTCALENDAR", payload: obj });
    });
    socket.on("ADD_CALENDAR_TEXT_UTAHCALENDAR", (obj) => {
      dispatch({ type: "ADD_CALENDAR_TEXT_UTAHCALENDAR", payload: obj });
    });
    socket.on("ADD_CALENDAR_TEXT_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "ADD_CALENDAR_TEXT_COLORADOCALENDAR", payload: obj });
    });
    socket.on("ADD_CALENDAR_TEXT_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "ADD_CALENDAR_TEXT_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("ADD_CALENDAR_TEXT_EASTCALENDAR", (obj) => {
      dispatch({ type: "ADD_CALENDAR_TEXT_EASTCALENDAR", payload: obj });
    });
    socket.on("DELETE_CALENDAR_TEXT_UTAHCALENDAR", (obj) => {
      dispatch({ type: "DELETE_CALENDAR_TEXT_UTAHCALENDAR", payload: obj });
    });
    socket.on("DELETE_CALENDAR_TEXT_COLORADOCALENDAR", (obj) => {
      dispatch({ type: "DELETE_CALENDAR_TEXT_COLORADOCALENDAR", payload: obj });
    });
    socket.on("DELETE_CALENDAR_TEXT_MIDWESTCALENDAR", (obj) => {
      dispatch({ type: "DELETE_CALENDAR_TEXT_MIDWESTCALENDAR", payload: obj });
    });
    socket.on("DELETE_CALENDAR_TEXT_EASTCALENDAR", (obj) => {
      dispatch({ type: "DELETE_CALENDAR_TEXT_EASTCALENDAR", payload: obj });
    });
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {localStorage.getItem("token") !== null ? (
            <Route path="/">
              <Route index element={<Dedicatedlist />} />
              <Route
                path="login"
                element={
                  <Login
                    inputs={loginInputs}
                    title="Login first to enter the pannel"
                  />
                }
              />
              <Route path="history" element={<History />} />
              <Route path="request" element={<Request />} />

              <Route path="settings">
                <Route index element={<Setting />} />

                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>

              <Route path="utah-trailers">
                <Route index element={<UtahTrailerList />} />
              </Route>

              <Route path="actionlog">
                <Route index element={<Actionlog />} />
              </Route>

              {/* <Route path="MidwestEastCalendars">
                <Route index element={<MidwestEastCalendars />} />
              </Route> */}

              <Route path="utah-calendar">
                <Route index element={<Calendar />} />
              </Route>
            </Route>
          ) : (
            <>
              <Route
                path="/login"
                element={
                  <Login
                    inputs={loginInputs}
                    title="Login to enter the pannel"
                  />
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
