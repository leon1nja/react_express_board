import "./settinglist.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  settingLocationColumns,
  settingTrailerColumns,
  settingTruckColumns,
  settingVendorColumns,
} from "../../datatablesource";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import TruckAdd from "./TruckAdd";
import TrailerAdd from "./TrailerAdd";
import VendorAdd from "./VendorAdd";
import {
  DeleteLocationAction,
  DeleteTrailerListAction,
  DeleteTruckListAction,
  DeleteVendorListAction,
} from "../../redux/actions/ListActions";
import LocationAdd from "./LocationAdd";
import { GetShedulesAction } from "../../redux/actions/DedicatedLaneActions";
import LocationEdit from "../locationEdit/LocationEdit";
import axios from "axios";
const SettingList = () => {
  const { Trucks, Trailers, Vendors } = useSelector(
    (state) => state.ListReducer
  );
  const { shedules } = useSelector((state) => state.DedicatedLaneReducer);

  const { token, user, logics } = useSelector((state) => state.UserReg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== null) {
      dispatch(GetShedulesAction(token));
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [token]);

  //Deletation
  const handleDelete1 = (id) => {
    var answer = window.confirm("Are you sure you want to delete it?");
    if (answer) {
      //some code
      dispatch(DeleteTruckListAction(id, token));
    } else {
      //some code
    }
  };

  const handleDelete2 = (id) => {
    var answer = window.confirm("Are you sure you want to delete it?");
    if (answer) {
      //some code
      dispatch(DeleteTrailerListAction(id, token));
    } else {
      //some code
    }
  };

  const handleDelete3 = (id) => {
    var answer = window.confirm("Are you sure you want to delete it?");
    if (answer) {
      //some code
      dispatch(DeleteVendorListAction(id, token));
    } else {
      //some code
    }
  };

  const handleDelete4 = (id) => {
    var answer = window.confirm("Are you sure you want to delete it?");
    if (answer) {
      //some code
      dispatch(DeleteLocationAction(id, token));
    } else {
      //some code
    }
  };

  const actionColumn1 = [
    {
      field: "action",
      headerName: "Delete",
      width: 100,
      headerClassName: "header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete Load"
                color="error"
                onClick={() => {
                  handleDelete1(params.row._id);
                }}
              >
                {" "}
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];
  const actionColumn2 = [
    {
      field: "action",
      headerName: "Delete",
      width: 100,
      headerClassName: "header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete Load"
                color="error"
                onClick={() => {
                  handleDelete2(params.row._id);
                }}
              >
                {" "}
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];
  const actionColumn3 = [
    {
      field: "action",
      headerName: "Delete",
      width: 100,
      headerClassName: "header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete Load"
                color="error"
                onClick={() => {
                  handleDelete3(params.row._id);
                }}
              >
                {" "}
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];
  const handleEdit = (obj) => {
    dispatch({ type: "EDIT_LOCATION_MODAL", payload: { open: true, obj } });
  };

  const actionColumn4 = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerClassName: "header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>
            <Tooltip title="Edit">
              <IconButton
                aria-label="Edit Row"
                color="primary"
                onClick={() => {
                  handleEdit(params.row);
                }}
              >
                {" "}
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete Load"
                color="error"
                onClick={() => {
                  handleDelete4(params.row._id);
                }}
              >
                {" "}
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  //Logic Settings

  const [logics2, setLogics] = useState({
    utahtrailer: 0,
    illinois: 0,
    colorado: 0,
  });

  useEffect(() => {
    setLogics(logics);
  }, [logics]);

  const saveLogic = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: token,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_BACKEND_API}logic?id=${logics._id}`,
      method: "PUT",
      headers: headersList,
      data: logics2,
    };

    let response = await axios.request(reqOptions);
    setLogics(response.data.logic);
    alert(response.data.msg);
  };
  return (
    <>
      {user.role === "superadmin" ? (
        <>
          {/* LOGIC BOARD */}
          <p className="calendarTitle"> Formula Board</p>
          {logics2.colorado && (
            <div className="flexInputs">
              <div className="flexes">
                <TextField
                  value={logics2.utahtrailer}
                  onChange={(e) =>
                    setLogics({ ...logics2, utahtrailer: e.target.value })
                  }
                  type="number"
                  id="outlined-basic"
                  label="Utah Logic"
                  variant="outlined"
                />
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={{ margin: "15px", borderRadius: "15px" }}
                  onClick={saveLogic}
                >
                  Save
                </Button>
              </div>
              <div className="flexes">
                <TextField
                  value={logics2.illinois}
                  onChange={(e) =>
                    setLogics({ ...logics2, illinois: e.target.value })
                  }
                  type="number"
                  id="outlined-basic"
                  label="Illinois Logic"
                  variant="outlined"
                />
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={{ margin: "15px", borderRadius: "15px" }}
                  onClick={saveLogic}
                >
                  Save
                </Button>
              </div>
              <div className="flexes">
                <TextField
                  value={logics2.colorado}
                  onChange={(e) =>
                    setLogics({ ...logics2, colorado: e.target.value })
                  }
                  type="number"
                  id="outlined-basic"
                  label="Colorado Logic"
                  variant="outlined"
                />
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={{ margin: "15px", borderRadius: "15px" }}
                  onClick={saveLogic}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
          {/* LOGIC BOARD END*/}
        </>
      ) : null}

      {/* TRUCK TRAILER VENDOR LISTS */}

      <p className="calendarTitle"> Assets Board</p>

      <div className="settingtable">
        <div className="con">
          <div className="datatableTitle">
            Trucks
            <TruckAdd />
          </div>
          <DataGrid
            className="datagrid"
            density="compact"
            rows={Trucks.filter(
              (truck) => (truck.id = Trucks.indexOf(truck) + 1)
            )}
            columns={settingTruckColumns.concat(actionColumn1)}
            pageSize={20}
            rowsPerPageOptions={[20]}
            getRowId={(row) => row._id}
            autoHeight
          />
        </div>
        <div className="con">
          <div className="datatableTitle">
            Trailers
            <TrailerAdd />
          </div>
          <DataGrid
            className="datagrid"
            density="compact"
            rows={Trailers.filter(
              (truck) => (truck.id = Trailers.indexOf(truck) + 1)
            )}
            columns={settingTrailerColumns.concat(actionColumn2)}
            pageSize={20}
            rowsPerPageOptions={[20]}
            getRowId={(row) => row._id}
            autoHeight
          />
        </div>
        <div className="con">
          <div className="datatableTitle">
            UT / CO / IL
            <VendorAdd />
          </div>
          <DataGrid
            className="datagrid"
            density="compact"
            rows={Vendors.filter(
              (truck) => (truck.id = Vendors.indexOf(truck) + 1)
            )}
            columns={settingVendorColumns.concat(actionColumn3)}
            pageSize={20}
            rowsPerPageOptions={[20]}
            getRowId={(row) => row._id}
            autoHeight
          />
        </div>
        <div className="con">
          <div className="datatableTitle">
            Location <LocationAdd />
          </div>
          <DataGrid
            className="datagrid"
            density="compact"
            rows={shedules.filter(
              (shedule) => (shedule.id = shedules.indexOf(shedule) + 1)
            )}
            columns={settingLocationColumns.concat(actionColumn4)}
            pageSize={20}
            rowsPerPageOptions={[20]}
            getRowId={(row) => row._id}
            autoHeight
          />
        </div>
        <LocationEdit />
      </div>
    </>
  );
};

export default SettingList;
