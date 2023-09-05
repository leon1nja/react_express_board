import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { NotificationActions } from "../../redux/actions/AuthActions";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { ToastHandler } from "../../redux/ToastHandler";

export default function CustomizedTimeline() {
  const { notifications, token } = useSelector((state) => state.UserReg);
  const [ searchAction, setSearchAction ] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(NotificationActions(token, ""));
  },[token]);

  useEffect(()=>{
    if(notifications?.length === 0 && searchAction) ToastHandler({status: false, msg: 'Search result is none!'});
  }, [notifications])

  const searchLogs = () => {
    dispatch(NotificationActions(token, searchInfo));
    setSearchAction(true);
  }

  const deleteSearchInfo = () => {
    dispatch(NotificationActions(token, ""));
    setSearchInfo("");
  }

  const press = (e) => {
    if(e.key === "Enter") dispatch(NotificationActions(token, searchInfo));
  }

  return (
    <Timeline>
      <div className="searchLogCon">
        <Paper
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 350,
          }}
        >
          <IconButton color="secondary" sx={{ p: "10px" }} aria-label="menu">
            <UpcomingIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={searchInfo}
            onChange={(e) => setSearchInfo(e.target.value)}
            placeholder="Search action logs"
            inputProps={{ "aria-label": "search action logs" }}
            onKeyDown={(e)=>press(e)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={(e)=>searchLogs()} >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            onClick={(e)=>deleteSearchInfo()}
            color="secondary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <CancelIcon />
          </IconButton>
        </Paper>
      </div>
      {notifications?.map((notification) => {
        const current = new Date(notification.createdAt);
        const date = `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`;
        //  const time = `${current.getHours()}:${current.getMinutes()}`;
        const time = current.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return (
          <TimelineItem key={notification._id}>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot variant="outlined" color="secondary">
                <Avatar
                  alt={notification.user.name}
                  src={`${process.env.REACT_APP_BACKEND_API}${notification.user.image}`}
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                {notification.user.name}
              </Typography>
              <Typography>
                {notification.title}
              </Typography>
              { (notification.oldValue) &&
                <Typography>
                Old value: {notification.oldValue}
              </Typography>}
              { (notification.newValue) &&
                <Typography>
                New value: {notification.newValue}
              </Typography>}
            </TimelineContent>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
              display={"flex"}
              justifyContent="space-evenly"
              alignItems={"center"}
            >
              {date} <AccessTimeFilledIcon className="clockIcon" color="secondary" />
              {time}
            </TimelineOppositeContent>
          </TimelineItem>
        );
      })}

      {/* <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
         {date}/ {time}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
          <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhQDokpgIyfjV1BFX08hiFYT7dBkY1FErk7-3tLBmIVWpQltjMD2pPOs1aYWLNY6bT7fY&usqp=CAU"/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            John
          </Typography>
          <Typography>Deleted 766 from board</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
         {date}/ {time}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
          <Avatar alt="Remy Sharp" src="https://simg.nicepng.com/png/small/182-1829287_cammy-lin-ux-designer-circle-picture-profile-girl.png"/>
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Anna
          </Typography>
          <Typography>Changed day from Monday to Tuesday for truck 788</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
         {date}/ {time}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
          <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtcO4YmGkZhf8rEs8DdPZYnLlPCpOF1pTMZMYf1lDHzaQFAqjUKPzRFdZaqDRuBuYKHo&usqp=CAU"/>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Kate
          </Typography>
          <Typography>Dispatched truck 003</Typography>
        </TimelineContent>
      </TimelineItem> */}
    </Timeline>
  );
}
