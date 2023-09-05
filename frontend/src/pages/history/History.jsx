import "./history.scss";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetHistorysAction } from "../../redux/actions/HistoryActions";
import HistoryList from "../../components/datatable/HistoryList";
import Actionlog from "../../components/Actionlog";

const History = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.UserReg);

  useEffect(() => {
    if (token !== null) {
      dispatch(GetHistorysAction(token));
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [token]);
  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        <AdminNavbar />
        <div className="tablesContainer">
          <HistoryList />
          <div className="timelineContainer">
            <h3 className="actionLogTitle">Action Log</h3>
            <Actionlog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
