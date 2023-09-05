import "./dailytrucklist.scss";
import { DataGrid } from "@mui/x-data-grid";
import { truckColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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


const Datatable = () => {
  const { trucks } = useSelector(state => state.TruckReducer)
  const { token } = useSelector(state => state.UserReg)
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(DeleteTruckAction(id, token))
  };
  const handleEdit = (id) => {
    dispatch({ type: "EDIT_MODAL", payload: { open: true, id } })
  };

  const handleDispatch=(id)=>{
var truck=JSON.stringify(trucks.filter((truck)=>truck._id===id)[0])
const obj={truck:truck}
dispatch(AddHistoryAction(obj,token))
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={3}>

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
                handleDelete(params.row._id);
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
      <DataGrid
        className="datagrid"
        rows={trucks.filter(truck => truck.id = trucks.indexOf(truck) + 1)}
        columns={truckColumns.concat(actionColumn)}
        pageSize={20}
        rowsPerPageOptions={[20]}
        //checkboxSelection
        getRowId={(row) => trucks.indexOf(row)}

      />
      <EditDialog />
    </div>
  );
};

export default Datatable;
