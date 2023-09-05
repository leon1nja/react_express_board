import "./midwestEastCalendars.scss";

import AdminNavbar from "../../components/navbar/AdminNavbar";
import MidwestEastDataTable from "../../components/datatable/MidwestEastDataTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetTrailersAction,
  GetTTrailersAction,
} from "../../redux/actions/TrailerActions";
import {
  GetColoradosAction,
  GetTColoradosesAction,
} from "../../redux/actions/DedicatedLaneActions";
import { GetLogicActions } from "../../redux/actions/AuthActions";
import { GetWeeklyMidwestCalendar } from "../../redux/actions/MidwestCalendarActions";
import { GetWeeklyEastCalendar } from "../../redux/actions/EastCalendarActions";
import { getWeeks } from "../../functionLib";

const MidwestEastCalendars = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.UserReg);

  useEffect(() => {
    const weeks = { date: getWeeks('ddd MMM D Y') };

    if (token !== null) {
      dispatch(GetTrailersAction(token));
      dispatch(GetColoradosAction(token));
      dispatch(GetTTrailersAction(token));
      dispatch(GetTColoradosesAction(token));
      dispatch(GetLogicActions(token));
      dispatch(GetWeeklyMidwestCalendar(weeks, token));
      dispatch(GetWeeklyEastCalendar(weeks, token));
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [token]);
  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        <AdminNavbar />
        <div className="tablesContainer">
          <MidwestEastDataTable />
          {/* <div className="timelineContainer">
              <h3 className="actionLogTitle" >Action Log</h3>
              <CustomizedTimeline/>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default MidwestEastCalendars;
