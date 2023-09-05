import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import SubjectIcon from '@mui/icons-material/Subject';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GridViewIcon from '@mui/icons-material/GridView';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DateTime from "../DateClock/DateTime";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const dispatch2=useDispatch()
  const logoutHandler=()=>{
dispatch2({type:"LOGOUT"})
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

        <Link to="/users" style={{ textDecoration: "none" }}>
          <li>
            <GridViewIcon className="icon" />
            <span>Dashboard</span>
          </li>   
          </Link>

        <Link to="/products" style={{ textDecoration: "none" }}>
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
          </Link>

          <Link to="/utah-trailers" style={{ textDecoration: "none" }}>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Utah Trailers</span>
          </li>
          </Link>

          <Link to="/users" style={{ textDecoration: "none" }}>
          <li>
            <TodayIcon className="icon" />
            <span>Requests</span>
          </li>
          </Link>

          <Link to="/users" style={{ textDecoration: "none" }}>
          <li>
            <CalendarMonthIcon className="icon" />
            <span>Utah Calendar</span>
          </li>
          </Link>
          <li onClick={logoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </div>
        <div className="items">
        <div className="item">
            <DateTime
              className="icon"
            />
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
