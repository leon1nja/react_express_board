import "./historylist.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { historyColumns } from "../../datatablesource";
import { useState, forwardRef } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useSelector, useDispatch } from "react-redux";
import EditDialog from "../EditDialog/EditDialog";
import {
  DeleteHistoryAction,
  RestoreHistoryAction,
} from "../../redux/actions/HistoryActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HistoryList = () => {
  const { historys } = useSelector((state) => state.HistoryReducer);
  const { token } = useSelector((state) => state.UserReg);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [delId, setId] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [state, setState] = useState({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openSnack } = state;

  const handleClickOpen = (id) => {
    return (e) => {
      e.preventDefault();
      if (selectionModel.length === 0) {
        setId([id]);
        setOpen(true);
      } else if (id === "multiple") {
        let idArr = [];
        selectionModel.map((_item) => {
          idArr.push(historys[_item]._id);
          return 0;
        });
        setId(idArr);
        setOpen(true);
      } else {
        setState({ openSnack: true, vertical: "top", horizontal: "right" });
      }
    };
  };

  const handleClose = () => {
    setOpen(false);
  };
  const snackHandleClose = () => {
    setState({ ...state, openSnack: false });
  };
  const handleDelete = (id) => {
    dispatch(DeleteHistoryAction(delId, token));
    handleClose();
    setId([]);
    setSelectionModel([]);
  };
  const HandleRestore = (id) => {
    dispatch(RestoreHistoryAction(id, token));
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "header",

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>
            <Tooltip title="Restore">
              <IconButton
                aria-label="Restore Load"
                color="success"
                onClick={() => {
                  HandleRestore(params.row._id);
                }}
              >
                {" "}
                <KeyboardDoubleArrowLeftIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete Load"
                color="error"
                onClick={handleClickOpen(params.row._id)}
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
  return (
    <div className="historylist">
      <div className="datatableTitle">
        Dispatch History
        {selectionModel.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "25px" }}
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen("multiple")}
          >
            {selectionModel.length} History delete
          </Button>
        )}
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {selectionModel.length === 0
              ? "Are you sure you want to delete this item?"
              : `Are you sure you want to delete ${selectionModel.length} items?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If deleted, recovery is not possible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: "5px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: "5px" }}
              onClick={handleDelete}
              autoFocus
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <DataGrid
        className="datagrid"
        density="compact"
        rows={historys.filter(
          (history) => (history.id = historys.indexOf(history) + 1)
        )}
        columns={historyColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        getRowId={(row) => historys.indexOf(row)}
        autoHeight
        getRowClassName={(params) => `row-${params.row.id}`}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        disableSelectionOnClick
      />
      <EditDialog />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        autoHideDuration={10000}
        onClose={snackHandleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={snackHandleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          You choose some histories for multiple delete now.
          <br /> In this case, you should use the multi-delete function to be
          safe!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HistoryList;
