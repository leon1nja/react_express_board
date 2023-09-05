import "./utahtrailerlist.scss";

import AdminNavbar from "../../components/navbar/AdminNavbar";
import UtahDataTable from "../../components/datatable/UtahDataTable";
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
import { GetWeeklyUtahCalendar } from "../../redux/actions/UtahCalendarActions";
import { GetWeeklyColoradoCalendar } from "../../redux/actions/ColoradoCalendarActions";
import { getWeeks } from "../../functionLib";

const UtahTrailerList = () => {
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
      dispatch(GetWeeklyUtahCalendar(weeks, token));
      dispatch(GetWeeklyColoradoCalendar(weeks, token));
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [token]);
  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        <AdminNavbar />
        <div className="tablesContainer">
          <UtahDataTable />
          {/* <div className="timelineContainer">
              <h3 className="actionLogTitle" >Action Log</h3>
              <CustomizedTimeline/>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default UtahTrailerList;
