import "./dedicatedlanestable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  dedicatedColumns,
  illusionColumns,
  illusionColumns2,
  midwestColumns,
} from "../../datatablesource";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import SheduleEdit from "../SheduleEdit/SheduleEdit";
import IllusionDialog from "../dedicatedLaneDialog/IllusionDialog";
import IllusionDialog2 from "../dedicatedLaneDialog/IllusionDialog2";
import {
  DeleteColoradoAction,
  DeleteIllinoisAction,
  DeleteMidwestAction,
  DeleteTIllinoisAction,
} from "../../redux/actions/DedicatedLaneActions";
import { useEffect } from "react";
import MidwestDialog from "../dedicatedLaneDialog/MidwestDialog";
import MidwestEditDialog from "../dedicatedLaneDialog/MidwestEditDialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IllinoisEditDialog from "../dedicatedLaneDialog/IllinoisEditDialog";
import DedicatedLaneTruckList from "./DedicatedLaneTruckList";
import HelperDedicatedLanes from "../dialog/HelperdedicatedLanes";
import ExtraTruckEditDialog from "../dedicatedLaneDialog/extraTruckEditDialog";
import EastWeeklyCalendar from '../EastCalendar';
import MidwestCalendar from '../MidwestCalendar';

const DedicatedTable = () => {
  const { shedules, illinoises, tillinoises, coloradoses, midwestes } =
    useSelector((state) => state.DedicatedLaneReducer);
  const { token, logics } = useSelector((state) => state.UserReg);
  const dispatch = useDispatch();

  const [warn, setWarn] = useState("");

  //Deletation
  const [open, setOpen] = useState(false);
  const [delId, setId] = useState();
  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (id) => {
    dispatch({ type: "EDIT_EXTRA_TRUCK_MODAL", payload: { open: true, id } });
  };
  const handleDelete = () => {
    if (illinoises.find((illinois) => illinois._id === delId)) {
      dispatch(DeleteIllinoisAction(delId, token));
      return handleClose();
    } else if (tillinoises.find((tillinois) => tillinois._id === delId)) {
      dispatch(DeleteTIllinoisAction(delId, token));
      return handleClose();
    } else if (coloradoses.find((colorado) => colorado._id === delId)) {
      dispatch(DeleteColoradoAction(delId, token));
      return handleClose();
    } else if (midwestes.find((midwest) => midwest._id === delId)) {
      dispatch(DeleteMidwestAction(delId, token));
      return handleClose();
    } else {
    }
  };

  //Trailer Logic Building

  useEffect(() => {
    const trailerCount = illinoises.length;
    const ttrailerCount = tillinoises.length;
    const trailerLogic = logics.illinois;
    if (
      (trailerCount !== 0 && trailerCount >= trailerLogic) ||
      ttrailerCount !== 0
    ) {
      const dif = trailerCount - trailerLogic;

      if (ttrailerCount === dif) {
        setWarn("");
      } else {
        if (dif < ttrailerCount) {
          setWarn(`Warning ! there's ${ttrailerCount - dif} extra Trucks below`);
        } else {
          setWarn(
            ` ${
              dif - ttrailerCount
            } extra trailers without trucks assigned`
          );
        }
      }
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [illinoises, tillinoises]);

  const handleEdit2 = (id) => {
    dispatch({ type: "EDIT_MIDWEST_MODAL", payload: { open: true, id } });
  };
  const handleEdit3 = (id) => {
    dispatch({ type: "EDIT_ILLINOIS_MODAL", payload: { open: true, id } });
  };
  const actionColumn1 = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "header",

      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit">
              <IconButton
                aria-label="Edit Row"
                color="primary"
                onClick={() => {
                  handleEdit3(params.row._id);
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
                  handleClickOpen(params.row._id);
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
      headerName: "Action",
      headerClassName: "header",

      width: 100,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit">
              <IconButton
                aria-label="Edit Row"
                color="primary"
                onClick={() => {
                  handleEdit(params.row._id);
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
                  handleClickOpen(params.row._id);
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

  const actionColumn4 = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit">
              <IconButton
                aria-label="Edit Row"
                color="primary"
                onClick={() => {
                  handleEdit2(params.row._id);
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
                  handleClickOpen(params.row._id);
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
  const OnClickCell = (e) => {
    if (e.field !== "location") {
      dispatch({
        type: "EDIT_SHEDULE_MODAL",
        payload: { open: true, data: e.value, field: e.field, id: e.row._id },
      });
    }
  };
  return (
    <>
      <div className="tables">
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this item?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you delete it, It cannot be restore from Dispatch History.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: "15px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "15px" }}
                onClick={handleDelete}
                autoFocus
              >
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="actiontable2">
          <SheduleEdit></SheduleEdit>
          {/* <div className="flex">
            <div className="flex1">
              <div className="actiontableTitle">
                Dedicated Lanes
                <HelperDedicatedLanes />
              </div>

              <DataGrid
                className="datagrid"
                rows={shedules}
                columns={dedicatedColumns}
                pageSize={12}
                rowsPerPageOptions={[12]}
                getRowId={(row) => shedules.indexOf(row)}
                //checkboxSelection
                autoHeight
                sx={{
                  width: "100%",
                  "& .locationCell": {
                    backgroundColor: "#FBF2BB",
                  },
                }}
                onCellDoubleClick={(e) => OnClickCell(e)}
              />
              <div className="actiontable3">
                <div className="actiontableTitleMidwest">TRAILERS</div>
                <div className="actiontableTitle midwestTitle">
                  Midwest Trailers
                  <MidwestEditDialog />
                  <MidwestDialog />
                </div>
                <DataGrid
                  className="datagrid"
                  density="compact"
                  rows={midwestes.filter(
                    (midwest) => (midwest.id = midwestes.indexOf(midwest) + 1)
                  )}
                  columns={midwestColumns.concat(actionColumn4)}
                  pageSize={12}
                  rowsPerPageOptions={[12]}
                  getRowId={(row) => midwestes.indexOf(row)}
                  //checkboxSelection
                  autoHeight
                  getRowClassName={(params) => `row-${params.row.id}`}
                />
              </div>
              <div className="actiontableTitleIllinois">ILLINOIS</div>
              <div className="illinois illinois2">
                <div className="actiontable1 ">
                  <IllinoisEditDialog />
                  <div className="actiontableTitle">
                    Illinois Trailers +{logics.illinois}
                    <p className="trailerWarning">{warn}</p>
                    <IllusionDialog />
                  </div>
                  <DataGrid
                    className="datagrid"
                    density="compact"
                    rows={illinoises.filter(
                      (illinois) =>
                        (illinois.id = illinoises.indexOf(illinois) + 1)
                    )}
                    columns={illusionColumns.concat(actionColumn1)}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    getRowId={(row) => illinoises.indexOf(row)}
                    //checkboxSelection
                    autoHeight
                    getRowClassName={(params) => `row-${params.row.id}`}
                  />
                </div>
                <div className="actiontable2 ">
                  <div className="actiontableTitle">
                    Illinois Extra Trucks
                    <IllusionDialog2 />
                  </div>
                  <DataGrid
                    className="datagrid"
                    density="compact"
                    rows={tillinoises.filter(
                      (tillinois) =>
                        (tillinois.id = tillinoises.indexOf(tillinois) + 1)
                    )}
                    columns={illusionColumns2.concat(actionColumn2)}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    getRowId={(row) => tillinoises.indexOf(row)}
                    //checkboxSelection
                    autoHeight
                  />
                </div>
              </div>
            </div>
            <div className="loadBoardRightField">
              <ExtraTruckEditDialog />
              <DedicatedLaneTruckList />
              <MidwestCalendar />
              <ColoradoWeeklyCalendar />
            </div>
          </div> */}
          <div className="flex">
            <div className="flex1">
              <div className="actiontableTitle">
                Dedicated Lanes
                <HelperDedicatedLanes />
              </div>

              <DataGrid
                className="datagrid"
                rows={shedules}
                columns={dedicatedColumns}
                pageSize={12}
                rowsPerPageOptions={[12]}
                getRowId={(row) => shedules.indexOf(row)}
                //checkboxSelection
                autoHeight
                sx={{
                  width: "100%",
                  "& .locationCell": {
                    backgroundColor: "#FBF2BB",
                  },
                }}
                onCellDoubleClick={(e) => OnClickCell(e)}
              />
            </div>
            <div className="loadBoardRightField">
              <ExtraTruckEditDialog />
              <DedicatedLaneTruckList />
            </div>
          </div>
          <div className="flex">
            <div className="flex1">
              <div className="actiontable3">
                <div className="actiontableTitleMidwest">TRAILERS</div>
                <div className="actiontableTitle midwestTitle">
                  Midwest Trailers
                  <MidwestEditDialog />
                  <MidwestDialog />
                </div>
                <DataGrid
                  className="datagrid"
                  density="compact"
                  rows={midwestes.filter(
                    (midwest) => (midwest.id = midwestes.indexOf(midwest) + 1)
                  )}
                  columns={midwestColumns.concat(actionColumn4)}
                  pageSize={12}
                  rowsPerPageOptions={[12]}
                  getRowId={(row) => midwestes.indexOf(row)}
                  //checkboxSelection
                  autoHeight
                  getRowClassName={(params) => `row-${params.row.id}`}
                />
              </div>
            </div>
            <div className="loadBoardRightField">
              <MidwestCalendar />
            </div>
          </div>
          <div className="flex">
            <div className="flex1">
              <div className="actiontableTitleIllinois">ILLINOIS</div>
              <div className="illinois illinois2">
                <div className="actiontable1 ">
                  <IllinoisEditDialog />
                  <div className="actiontableTitle">
                    Illinois Trailers +{logics.illinois}
                    <p className="trailerWarning">{warn}</p>
                    <IllusionDialog />
                  </div>
                  <DataGrid
                    className="datagrid"
                    density="compact"
                    rows={illinoises.filter(
                      (illinois) =>
                        (illinois.id = illinoises.indexOf(illinois) + 1)
                    )}
                    columns={illusionColumns.concat(actionColumn1)}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    getRowId={(row) => illinoises.indexOf(row)}
                    //checkboxSelection
                    autoHeight
                    getRowClassName={(params) => `row-${params.row.id}`}
                  />
                  <div className="actiontableTitle">
                    Illinois Extra Trucks
                    <IllusionDialog2 />
                  </div>
                  <DataGrid
                    className="datagrid"
                    density="compact"
                    rows={tillinoises.filter(
                      (tillinois) =>
                        (tillinois.id = tillinoises.indexOf(tillinois) + 1)
                    )}
                    columns={illusionColumns2.concat(actionColumn2)}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                    getRowId={(row) => tillinoises.indexOf(row)}
                    //checkboxSelection
                    autoHeight
                  />
                </div>
              </div>
            </div>
            <div className="loadBoardRightField">
              <EastWeeklyCalendar />
            </div>
          </div>
        </div>
        {/*     
        <div className="actiontableTitleIllinois">
          ILLINOIS
        </div> */}

        {/* <div className="illinois illinois2">
          <div className="actiontable1 ">
              <IllinoisEditDialog />
            <div className="actiontableTitle">
              Illinois Trailers
              <p className="trailerWarning">{warn}</p>

              <IllusionDialog />
            </div>
            <DataGrid
              className="datagrid"         
              density="compact"
              rows={illinoises.filter(illinois => illinois.id = illinoises.indexOf(illinois) + 1)}
              columns={illusionColumns.concat(actionColumn1)}
              pageSize={20}
              rowsPerPageOptions={[20]}
              getRowId={row => illinoises.indexOf(row)}
              //checkboxSelection
              autoHeight
              getRowClassName={(params) => `row-${params.row.id}`}

            />

          </div>
          <div className="actiontable2 ">
            <div className="actiontableTitle">
              Illinois Parked Trucks
              <IllusionDialog2 />
            </div>
            <DataGrid
              className="datagrid"         
              density="compact"
              rows={tillinoises.filter(tillinois => tillinois.id = tillinoises.indexOf(tillinois) + 1)}
              columns={illusionColumns2.concat(actionColumn2)}
              pageSize={20}
              rowsPerPageOptions={[20]}
              getRowId={row => tillinoises.indexOf(row)}
              //checkboxSelection
              autoHeight
            />

          </div>
        </div> */}
      </div>
    </>
  );
};

export default DedicatedTable;
