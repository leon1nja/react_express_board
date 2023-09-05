import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import SubjectIcon from '@mui/icons-material/Subject';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GridViewIcon from '@mui/icons-material/GridView';
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DateTime from "../DateClock/DateTime";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";

const AdminNavbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useSelector(state => state.UserReg)
  const dispatch2 = useDispatch()
  const logoutHandler = () => {
    dispatch2({ type: "LOGOUT" })
  }

  return (
    <div className="navbar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Loadboard</span>
        </Link>
      </div>
      <div className="wrapper">
        <div className="menuitem">

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <GridViewIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/utah-trailers" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Utah / Colorado</span>
            </li>
          </Link>
          <Link to="/request" style={{ textDecoration: "none" }}>
            <li>
              <TodayIcon className="icon" />
              <span>Requests</span>
            </li>
          </Link>
          {/* <Link to="/truck-list" style={{ textDecoration: "none" }}>
            <li>
              <SubjectIcon className="icon" />
              <span>Daily Truck List</span>
            </li>
          </Link>

          <Link to="/dedicated-lanes" style={{ textDecoration: "none" }}>
            <li>
              <CalendarViewMonthIcon className="icon" />
              <span>Dedicated Lanes</span>
            </li>
          </Link> */}

          

          {/* <Link to="/MidwestEastCalendars" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Midwest & East Calendars</span>
            </li>
          </Link> */}
          

          {/* <Link to="/utah-calendar" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Utah Calendar</span>
            </li>
          </Link> */}

          <Link to="/history" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Dispatch History</span>
            </li>
          </Link>

       {
        user.role === "user" ? (null):(<><Link to="/settings" style={{ textDecoration: "none" }}>
        <li>
          <SettingsIcon className="icon" />
          <span>Settings</span>
        </li>
      </Link>
      {
        user.role ==="superadmin" && (
       <Link to="/settings/new" style={{ textDecoration: "none" }}>
       <li>
         <PsychologyOutlinedIcon className="icon" />
         <span>Users</span>
       </li>
       </Link>
        )
      }
       </>
      )
       }
      
          <li onClick={logoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>

        </div>
        <div className="items">
        
          <div className="item">
          <DateTime/>
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
      
        
          <div className="item">
            {/* <img
              src={user?`${process.env.REACT_APP_BACKEND_API}${user.image}`:"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600"}
              alt=""
              className="avatar"
              /> */}
          </div>
          <div className="item" style={{fontWeight:"bold",fontSize:"16px"}}>
{user.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
