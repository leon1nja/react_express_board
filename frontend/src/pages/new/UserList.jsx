import "./new.scss";
import { DataGrid } from "@mui/x-data-grid";
import { UserColumns} from "../../datatablesource";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { useSelector, useDispatch } from "react-redux";

import { DeleteUser } from "../../redux/actions/AuthActions";


const UserList = () => {
  const { token ,users} = useSelector(state => state.UserReg)
  const dispatch=useDispatch()
  const [open, setOpen] = useState(false);
  const [delId, setId] = useState()
  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };
  const handleDelete=(id)=>{
dispatch(DeleteUser(delId,token))
handleClose()

  }

  const handleClose = () => {
    setOpen(false);
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName:"header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>
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
    <div className="datatable userTable">
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
                Are you sure you want to delete this user ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="error" sx={{borderRadius:"5px"}} onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="success" sx={{borderRadius:"5px"}} onClick={handleDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
      <div className="datatableTitle">
       All Users
      </div>
      <DataGrid
      autoHeight
        className="datagrid"
        density="compact"
        rows={users.filter(user => user.id = users.indexOf(user) + 1)}
        columns={UserColumns.concat(actionColumn)}
        pageSize={20}
        rowsPerPageOptions={[20]}
        //checkboxSelection
        getRowId={(row) => users.indexOf(row)}
        
        
      />
    </div>
  );
};

export default UserList;
