import "./Dialog.scss";
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useEffect } from "react";
import { EditIllinoisAction } from "../../redux/actions/DedicatedLaneActions";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function IllinoisEditDialog({ children }) {
  const [state, setState] = React.useState({
    truck_num: "",
    trailer: "",
    location: {},
    notes: "",
  });
  const { token } = useSelector((state) => state.UserReg);
  const { illinois, EditIllinoisModal } = useSelector(
    (state) => state.DedicatedLaneReducer
  );
  const { Trucks, Vendors, Trailers } = useSelector(
    (state) => state.ListReducer
  );
  const [trucks, setTrucks] = useState([]);
  /*eslint-disable no-unused-vars*/
  const [vendors, setVendors] = useState([]);
  const [trailers, setTrailers] = useState([]);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "EDIT_ILLINOIS_MODAL", payload: { open: false } });
  };
  const OnChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(EditIllinoisAction(state, illinois._id, token));
    dispatch({ type: "EDIT_ILLINOIS_MODAL", payload: { open: false } });
  };
  React.useEffect(() => {
    if (illinois.location) {
      setState({
        ...state,
        location: illinois.location,
        truck_num: illinois.truck_num,
        trailer: illinois.trailer,
        notes: illinois.notes,
      });
    }
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [illinois]);
  useEffect(() => {
    var arr = [];
    Trucks.map((truck) => arr.push(truck.name));
    setTrucks([...arr]);
    var arr1 = [];
    Trailers.map((trailer) => arr1.push(trailer.name));
    setTrailers([...arr1]);
    var arr3 = [];
    Vendors.map((vendor) => arr3.push(vendor.name));
    setVendors([...arr3]);
  }, [Trucks, Vendors, Trailers]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={EditIllinoisModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Illinois Edit Form
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="bottom">
            <div className="right2">
              <form>
                <Autocomplete
                  value={state.trailer}
                  onChange={(event, newValue) => {
                    setState({ ...state, trailer: newValue });
                  }}
                  id="controllable-states-demo"
                  options={trailers}
                  className="autocompleteInput"
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Trailer #" />
                  )}
                />

                <FormControl className="formInput">
                  <InputLabel
                    id="demo-simple-select-label"
                    placeholder="Location"
                  >
                    Location
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.location.name}
                    label="Location"
                    onChange={(e) =>
                      setState({
                        ...state,
                        location: Vendors.filter(
                          (vendor) => vendor.name === e.target.value
                        )[0],
                      })
                    }
                    placeholder="Vendor"
                  >
                    {Vendors.map((vendor) => (
                      <MenuItem key={vendor._id} value={vendor.name}>
                        {vendor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Autocomplete
                  value={state.truck_num}
                  onChange={(event, newValue) => {
                    setState({ ...state, truck_num: newValue });
                  }}
                  id="controllable-states-demo"
                  options={trucks}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="By Truck #" />
                  )}
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  type="text"
                  onChange={OnChangeHandler}
                  rows={2}
                  id="filled-multiline-static"
                  label="Notes"
                  name="notes"
                  value={state.notes}
                />

                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "15px" }}
                  startIcon={<SaveIcon />}
                  onClick={OnSubmitHandler}
                >
                  SAVE changes
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
        {children}
      </BootstrapDialog>
    </div>
  );
}
