import "./Dialog.scss";
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { truckInputs } from "../../formSource";
import { useDispatch, useSelector } from "react-redux";
import { AddTruckAction } from "../../redux/actions/TruckActions";
import Autocomplete from "@mui/material/Autocomplete";
import InfoIcon from '@mui/icons-material/Info';
import HelperTextdailyTrucklist from './Helper'

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Info } from "@material-ui/icons";
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

export default function CustomizedDialogs({ children }) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    truck_num: "",
    state: "",
    city: "",
    day: "",
    notes: "",
  });
  const { token } = useSelector((state) => state.UserReg);
  const { Trucks } = useSelector((state) => state.ListReducer);
  const [trucks, setTrucks] = useState([]);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const OnChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(AddTruckAction(state, token));
    setOpen(false);
    setState({ truck_num: "", state: "", city: "", day: "", notes: "" });
  };
  useEffect(() => {
    var arr = [];
    Trucks.map((truck) => arr.push(truck.name));
    setTrucks([...arr]);
  }, [Trucks]);

  return (
    <div className="helper">
      <div className="helperText">
      
      <HelperTextdailyTrucklist />
      </div>
      <Button
        variant="contained"
        color="secondary"
        sx={{ borderRadius: "25px" }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen}
      >
        Add Truck
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Truck Form
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="bottom">
            <div className="right2">
              <form>
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(event, newValue) => {
                    setState({ ...state, truck_num: newValue });
                  }}
                  id="controllable-states-demo"
                  options={trucks}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Truck #" />
                  )}
                />
                {truckInputs.map((input) => (
                  <TextField
                    variant="outlined"
                    key={input.id}
                    label={input.label}
                    type={input.type}
                    onChange={OnChangeHandler}
                    placeholder={input.placeholder}
                    name={input.name}
                  />
                ))}
                <FormControl className="formInput">
                  <InputLabel
                    id="demo-simple-select-label"
                    placeholder="Friday"
                  >
                    Day
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.day}
                    label="Day"
                    onChange={(e) =>
                      setState({ ...state, day: e.target.value })
                    }
                    placeholder="Friday"
                  >
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                    <MenuItem value="Saturday">Saturday</MenuItem>
                    <MenuItem value="Sunday">Sunday</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  value={state.notes}
                  fullWidth
                  multiline
                  type="text"
                  onChange={OnChangeHandler}
                  rows={2}
                  id="filled-multiline-static"
                  label="Notes"
                  name="notes"
                />

                <Button className="button" onClick={OnSubmitHandler}>
                  ADD
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
