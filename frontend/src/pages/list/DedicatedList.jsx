import "./dedicatedlist.scss";

import AdminNavbar from "../../components/navbar/AdminNavbar";
import DedicatedTable from "../../components/datatable/DedicatedLanesTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetColoradosAction,
  GetIllinoisesAction,
  GetMidwestsAction,
  GetShedulesAction,
  GetTIllinoisesAction,
} from "../../redux/actions/DedicatedLaneActions";
import { GetRequestsAction } from "../../redux/actions/RequestAction";
import { GetTrucksAction } from "../../redux/actions/TruckActions";
import { GetLogicActions } from "../../redux/actions/AuthActions";
import { GetWeeklyMidwestCalendar } from "../../redux/actions/MidwestCalendarActions";
import { GetWeeklyEastCalendar } from "../../redux/actions/EastCalendarActions";
import { getWeeks } from "../../functionLib";

const DedicatedList = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.UserReg);

  useEffect(() => {
    const weeks = { date: getWeeks('ddd MMM D Y') };
    
    if (token !== null) {
      dispatch(GetShedulesAction(token));
      dispatch(GetRequestsAction(token));
      dispatch(GetIllinoisesAction(token));
      dispatch(GetTIllinoisesAction(token));
      dispatch(GetColoradosAction(token));
      dispatch(GetMidwestsAction(token));
      dispatch(GetTrucksAction(token));
      dispatch(GetLogicActions(token));
      dispatch(GetWeeklyMidwestCalendar(weeks, token));
      dispatch(GetWeeklyEastCalendar(weeks, token));
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [token]);

  return (
    <div className="dedicatedlist">
      {/* <Sidebar/> */}
      <div className="dedicatedlistContainer">
        <AdminNavbar />
        <div className="tablesContainer">
          <DedicatedTable />
          {/* <div className="timelineContainer">
          <h3 className="actionLogTitle" >Action Log</h3>

            <CustomizedTimeline />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DedicatedList;
