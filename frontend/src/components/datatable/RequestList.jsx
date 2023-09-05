import "./requestlist.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { requestColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from "react-redux";
import RequestDialog from "../RequestDialog/RequestDialog";
import { DeleteRequestAction } from "../../redux/actions/RequestAction";
import EditRequestDialog from "../EditRequestDialog/EditRequestDialog";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GridRowClassNameParams } from '@mui/x-data-grid';


const RequestList = () => {
  const [ requestsData, setRequestsData ] = useState([]);
  const { requests, matched } = useSelector(state => state.RequestReducer);
  const { token } = useSelector(state => state.UserReg);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [delId, setId] = useState();

  useEffect(()=>{
    let tempRequests = requests;
    if(matched){
      tempRequests.forEach((request)=>{
        if(request.truck_num === matched) request.matched = true;
      })
    }
    setRequestsData(tempRequests);
  },[requests])

  useEffect(()=>{
    let tempRequests = requests;
    tempRequests.forEach((request)=>{
      if(request.truck_num === matched) request.matched = true;
    })
    setRequestsData(tempRequests);
  },[matched])
  
  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {

    dispatch(DeleteRequestAction(delId, token))
    handleClose()
  };

  const handleEdit = (id) => {
    dispatch({ type: "EDIT_REQUEST_MODAL", payload: { open: true, id } })
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
  return (
    <div className="requestlist">
      <div className="datatableTitle">
        Request List
        <RequestDialog />

      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this request?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please Confirm or Cancel.
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
        rows={requestsData.filter(request => request.id = requestsData.indexOf(request) + 1)}
        columns={requestColumns.concat(actionColumn)}
        pageSize={50}
        components={{Toolbar: GridToolbar}}
        rowsPerPageOptions={[50]}
        disableDensitySelector={false}
        //checkboxSelection
        getRowId={(row) => requestsData.indexOf(row)}
        autoHeight
        getRowClassName={(params) => `row-${params.row.id} ${(params.row.matched? "matched" : "")}`}
      />
      <EditRequestDialog />
    </div>
  );
};

export default RequestList;
