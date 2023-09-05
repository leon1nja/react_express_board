import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState, forwardRef } from "react";
import { NotificationActions, DeleteNotifications } from "../../redux/actions/AuthActions";
import { actionlogColumns } from "../../datatablesource";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import { ToastHandler } from "../../redux/ToastHandler";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Actionlog() {
    const { notifications, token } = useSelector((state) => state.UserReg);
    const [ actionlogs, setActionlogs ] = useState([]);
    const [ searchAction, setSearchAction ] = useState(false);
    const [searchInfo, setSearchInfo] = useState("");
    const [selectionModel, setSelectionModel] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(NotificationActions(token, ""));
    },[token]);

    useEffect(()=>{
        if(notifications?.length === 0 && searchAction) ToastHandler({status: false, msg: 'Search result is none!'});
        if(notifications) setActionlogs(notifications);
    }, [notifications])

    const handleDelete = () => {
        let delId = [];
            selectionModel.map((_item) => {
                delId.push(notifications[_item]._id);
                return 0;
            });

        const text = "Are you sure to delete all? If you delete all action logs, you will lose all actionlog completely and it is not recovered.";
        if(confirm(text)) {
            dispatch(DeleteNotifications(delId, searchInfo, token));
        }
        setSelectionModel([]);
    };


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

    return(
        <>
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
                {selectionModel.length > 0 && (
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ borderRadius: "25px", marginLeft: "10px" }}
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                    >
                        {selectionModel.length} Delete Rows
                    </Button>
                )}
            </div>
            <DataGrid
                className="datagrid"
                density="compact"
                rows={actionlogs?.filter(notification => notification.id = actionlogs?.indexOf(notification) + 1)}
                columns={actionlogColumns}
                pageSize={25}
                pagination={true}
                components={{Toolbar: GridToolbar}}
                rowsPerPageOptions={[25]}
                disableDensitySelector={false}
                getRowId={(row) => actionlogs?.indexOf(row)}
                autoHeight
                // checkboxSelection
                checkboxSelectionVisibleOnly={true}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                disableSelectionOnClick
                getRowClassName={(params) => `row-${params.row.id}`}
            />
        </>
    )
}