import "./dailytrucklist.scss";
import { DataGrid } from "@mui/x-data-grid";
import { truckColumns } from "../../datatablesource";
import {  useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import CustomizedDialogs from "../dialog/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { DeleteTruckAction } from "../../redux/actions/TruckActions";
import EditDialog from "../EditDialog/EditDialog";
import { AddHistoryAction } from "../../redux/actions/HistoryActions";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const DailyTruckList = () => {
  const { trucks } = useSelector(state => state.TruckReducer)
  const { token } = useSelector(state => state.UserReg)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [delId, setId] = useState();

  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {

    dispatch(DeleteTruckAction(delId, token))
    handleClose()
  };
  const handleEdit = (id) => {
    dispatch({ type: "EDIT_MODAL", payload: { open: true, id } })
  };

  const handleDispatch = (id) => {
    var truck = JSON.stringify(trucks.filter((truck) => truck._id === id)[0])
    const obj = { truck: truck }
    dispatch(AddHistoryAction(obj, token))
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName:"header",
      width: 200,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>

            <Tooltip title="Edit">
              <IconButton aria-label="Edit Row" color="primary" onClick={() => {
                handleEdit(params.row._id);
              }}> <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Dispatch">
              <IconButton aria-label="dispatch" color="success" onClick={() => {
                handleDispatch(params.row._id);
              }}> <DoubleArrowIcon />
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
    <div className="datatable">
      <div className="datatableTitle">
        Daily Trucklist
        <CustomizedDialogs>
          {/*           
          <Link to="/users/new" className="link">
          Add New
        </Link> */}
        </CustomizedDialogs>
      </div>
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
              <Button variant="contained" color="error" sx={{borderRadius:"15px"}} onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="success" sx={{borderRadius:"15px"}} onClick={handleDelete} autoFocus>
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      <DataGrid
        className="datagrid"
        density="compact"
        rows={trucks.filter(truck => truck.id = trucks.indexOf(truck) + 1)}
        columns={truckColumns.concat(actionColumn)}
        pageSize={30}
        rowsPerPageOptions={[30]}
        // rowHeight={40}
        getRowId={(row) => trucks.indexOf(row)}
        autoHeight
        sortModel={sortModel}
        onSortModelChange={(model) => handleSortChange(model)}
      />
      <EditDialog />
    </div>
  );
};

export default DailyTruckList;
