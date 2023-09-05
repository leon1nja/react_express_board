import "./utahdatatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { utahColumns, coloradoColumns, illusionColumns2 } from "../../datatablesource";
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

import TrailerDialog from "../TrailerDialog/TrailerDialog";
import { useSelector, useDispatch } from "react-redux";
import { DeleteTrailerAction, DeleteTTrailerAction } from "../../redux/actions/TrailerActions";
import EditTrailerDialog from "../EditTrailerDialog/EditTrailerDialog";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ColoradoDialog from "../dedicatedLaneDialog/ColoradoDialog";
import ColoradoEditDialog from "../dedicatedLaneDialog/ColoradoEditDialog";
import { DeleteColoradoAction, DeleteTColoradoAction } from "../../redux/actions/DedicatedLaneActions";
import TrailerDialog2 from "../dedicatedLaneDialog/TrailerDialog2";
import ColoradoDialog2 from "../dedicatedLaneDialog/ColoradoDialog2";
import ColoradoTruckDialog from "../dedicatedLaneDialog/ColoradoTruckDialog";
import UtahWeeklyCalendar from "../UtahWeeklyCalendar";
import ColoradoWeeklyCalendar from "../ColoradoWeeklyCalendar";
import TrailerTruckDialog from "../dedicatedLaneDialog/TrailerTruckDialog";

const UtahDatatable = () => {
  const { trailers, ttrailers } = useSelector(state => state.TrailerReducer)
  const { token, user, logics } = useSelector(state => state.UserReg)
  const { coloradoses, tcoloradoses } = useSelector(state => state.DedicatedLaneReducer)

  const [warn, setWarn] = useState("")
  const [warn2, setWarn2] = useState("")

  const dispatch = useDispatch()

 //Deletation 
  const [open, setOpen] = useState(false);
  const [delId, setId] = useState()
  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {
    if (trailers.find(trailer => trailer._id === delId)) {
      dispatch(DeleteTrailerAction(delId, token))
      return handleClose()

    } else if (coloradoses.find(colorado => colorado._id === delId)) {
      dispatch(DeleteColoradoAction(delId, token))
      return handleClose()
    } else if (ttrailers.find(ttrailer => ttrailer._id === delId)) {
      dispatch(DeleteTTrailerAction(delId, token))
      return handleClose()
    } else if (tcoloradoses.find(tcolorado => tcolorado._id === delId)) {
      dispatch(DeleteTColoradoAction(delId, token))
      return handleClose()
    } else {

    }

  };

  const handleEdit = (id) => {
    dispatch({ type: "EDIT_TRAILER_MODAL", payload: { open: true, id } })
  };



    //Trailer Logic Building

  useEffect(() => {
    const trailerCount = trailers.length
    const ttrailerCount = ttrailers.length
    const trailerLogic = logics.utahtrailer
    if (trailerCount !== 0 && trailerCount >= trailerLogic || ttrailerCount !== 0) {
      const dif = trailerCount - trailerLogic

      if (ttrailerCount === dif) {
        setWarn("")
      } else {
        if (dif < ttrailerCount) {
          setWarn(`Warning ! there's ${ttrailerCount - dif} extra Trucks below`)
        } else {
          setWarn(`Warning ! there's ${dif - ttrailerCount} extra trailer without trucks assigned`)

        }

      }
    }
  }, [trailers, ttrailers])


  useEffect(() => {
    const trailerCount = coloradoses.length
    const ttrailerCount = tcoloradoses.length
    const trailerLogic = logics.colorado
    if (trailerCount !== 0 && trailerCount >= trailerLogic || ttrailerCount !== 0) {
      const dif = trailerCount - trailerLogic
     
      if (ttrailerCount === dif) {
        setWarn2("")
      } else {
        if (dif < ttrailerCount) {
          setWarn2(`Warning ! there's ${ttrailerCount - dif} extra Trucks below`)
        } else {
          setWarn2(`Warning ! there's ${dif - ttrailerCount} extra trailers without trucks assigned`)

        }

      }
    }
  }, [coloradoses, tcoloradoses])

  // truck Counters for Table titles
  const utahtruckCounter = ttrailers.length
  const coloradotruckCounter = tcoloradoses.length
  

  const handleEdit1 = (id) => {
    dispatch({ type: "EDIT_COLORADO_MODAL", payload: { open: true, id } })
  };

  const handleEditUtahTrucks = (id) => {
    dispatch({ type: "EDIT_TRAILER_TRUCK_MODAL", payload: { open: true, id } })
  };

  const handleEditColoradoTrucks = (id) => {
    dispatch({ type: "EDIT_COLORADO_TRUCK_MODAL", payload: { open: true, id } })
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerClassName:"header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>

            <Tooltip title="Edit">
              <IconButton aria-label="Edit Row" color="primary" onClick={() => {
                handleEdit(params.row._id);
              }}> <EditIcon />
              </IconButton>
            </Tooltip>

           <Tooltip title="Delete">
                <IconButton aria-label="Delete Load" color="error" onClick={() => {
                  handleClickOpen(params.row._id);
                }}> <DeleteIcon />
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
      width: 125,
      headerClassName:"header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>

            <Tooltip title="Edit">
              <IconButton aria-label="Edit Row" color="primary" onClick={() => {
                handleEditUtahTrucks(params.row._id);
              }}> <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton aria-label="Delete Load" color="error" onClick={() => {
                handleClickOpen(params.row._id);
              }}> <DeleteIcon />
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
      headerName: "Action",
      width: 125,
      headerClassName:"header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>

            <Tooltip title="Edit">
              <IconButton aria-label="Edit Row" color="primary" onClick={() => {
                handleEdit1(params.row._id);
              }}> <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton aria-label="Delete Load" color="error" onClick={() => {
                handleClickOpen(params.row._id);
              }}> <DeleteIcon />
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
      width: 125,
      headerClassName:"header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>

            <Tooltip title="Edit">
              <IconButton aria-label="Edit Row" color="primary" onClick={() => {
                handleEditColoradoTrucks(params.row._id);
              }}> <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton aria-label="Delete Load" color="error" onClick={() => {
                handleClickOpen(params.row._id);
              }}> <DeleteIcon />
              </IconButton>
            </Tooltip>

          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <div className="datatable">
        <div className="utahContainer">
          <div className="trailerContainer">
            <EditTrailerDialog />
            <TrailerTruckDialog />
            <div className="actiontableTitle">
              <div className="trailersTitle">Utah Trailers +{logics.utahtrailer}</div>
              <p className="trailerWarning">{warn}</p> 
              <TrailerDialog></TrailerDialog>
              
            </div>
            <DataGrid
              className="datagrid" 
              density="compact"
              components={{Toolbar: GridToolbar}}
              rows={trailers.filter(trailer => trailer.id = trailers.indexOf(trailer) + 1)}
              columns={utahColumns.concat(actionColumn)}
              pageSize={30}
              rowsPerPageOptions={[30]}
              autoHeight
              getRowClassName={(params) => `row-${params.row.id}`}

            />
            <div className="actiontableTitle">
              Extra UT Trucks 
              <h3 className="truckCounter"> {utahtruckCounter}</h3>
              <TrailerDialog2 />
            </div>
            <DataGrid
              className="datagrid" 
              density="compact"
              rows={ttrailers}
              columns={illusionColumns2.concat(actionColumn2)}
              pageSize={15}
              rowsPerPageOptions={[15]}
              getRowId={row => ttrailers.indexOf(row)}
              autoHeight
            />
          </div>
          <div className="utahTrucktable">
            <UtahWeeklyCalendar />
          </div>
        </div>

        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this Trailer?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please Confirm or Cancel before continuing.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="error" sx={{ borderRadius: "5px" }} onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="success" sx={{ borderRadius: "5px" }} onClick={handleDelete} autoFocus>
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <br />
        <br />
        <div className="coloradoContainer">
          <div className="trailerContainer ">
              <ColoradoEditDialog />
              <ColoradoTruckDialog />
            <div className="actiontableTitle">
              Colorado Trailers +{logics.colorado }
              <p className="trailerWarning">{warn2}</p>

              <ColoradoDialog />
            </div>
            <DataGrid
              className="datagrid" 
              density="compact"
              rows={coloradoses.filter(trailer => trailer.id = coloradoses.indexOf(trailer) + 1)}
              columns={coloradoColumns.concat(actionColumn3)}
              pageSize={20}
              rowsPerPageOptions={[20]}
              autoHeight
              getRowClassName={(params) => `row-${params.row.id}`}

            />

            <div className="actiontableTitle">
              Extra CO Trucks
              <h3 className="truckCounter"> {coloradotruckCounter} </h3>
              <ColoradoDialog2 />
            </div>
            <DataGrid
              className="datagrid" density="compact"
              rows={tcoloradoses}
              columns={illusionColumns2.concat(actionColumn4)}
              pageSize={15}
              rowsPerPageOptions={[15]}
              getRowId={row => tcoloradoses.indexOf(row)}
              autoHeight
            />
          </div>
          <div className="coloradoTrucktable">
            <ColoradoWeeklyCalendar />
          </div>
        </div>
      </div>
    </>

  );
};

export default UtahDatatable;
