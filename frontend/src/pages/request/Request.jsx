import "./request.scss";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import RequestList from "../../components/datatable/RequestList";
import CustomizedTimeline from "../../components/timeline/Timeline";
import Actionlog from "../../components/Actionlog";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRequestsAction } from "../../redux/actions/RequestAction";

const Request = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.UserReg);

  useEffect(() => {
    if (token !== null) {
      dispatch(GetRequestsAction(token));
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [token]);
  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        <AdminNavbar />
        <div className="tablesContainer">
          <RequestList />
          {/* <div className="timelineContainer">
            <h3 className="actionLogTitle">Action Log</h3>
            {/* <CustomizedTimeline /> */}
            {/* <Actionlog /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Request;
