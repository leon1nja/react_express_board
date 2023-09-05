import "./EditDialog.scss";
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { EditTruckAction } from "../../redux/actions/TruckActions";
import Autocomplete from "@mui/material/Autocomplete";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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

export default function EditDialog({ children }) {
  const [state, setState] = React.useState({
    truck_num: "",
    state: "",
    city: "",
    day: "",
    notes: "",
  });
  const { token } = useSelector((state) => state.UserReg);
  const { EditModal, truck } = useSelector((state) => state.TruckReducer);
  const { Trucks } = useSelector((state) => state.ListReducer);
  const [trucks, setTrucks] = React.useState([]);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "EDIT_MODAL", payload: { open: false } });
  };
  const OnChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const OnSubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(EditTruckAction(state, truck._id, token));
    dispatch({ type: "EDIT_MODAL", payload: { open: false } });
  };

  React.useEffect(() => {
    var arr = [];
    Trucks.map((truck) => arr.push(truck.name));
    setTrucks([...arr]);
  }, [Trucks]);
  React.useEffect(() => {
    setState({
      ...state,
      truck_num: truck.truck_num,
      state: truck.state,
      city: truck.city,
      day: truck.day,
      notes: truck.notes,
    });
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [truck]);
  if (!state.truck_num) {
    return null;
  }
  return (
    <div>
      {/* <Button variant="contained" color="secondary" sx={{borderRadius: '25px'}} onClick={handleClickOpen}>
        Add Line
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={EditModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Truck Edit Form
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="bottom">
            <div className="right2">
              <form>
                <Autocomplete
                  value={state.truck_num}
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

                <TextField
                  label="City"
                  type="text"
                  value={state.city}
                  onChange={OnChangeHandler}
                  name="city"
                />

                <TextField
                  label="State"
                  type="text"
                  value={state.state}
                  onChange={OnChangeHandler}
                  name="state"
                />
                <FormControl className="formInput">
                  <InputLabel id="demo-simple-select-label">Day</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.day}
                    label="Day"
                    onChange={(e) =>
                      setState({ ...state, day: e.target.value })
                    }
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

                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "15px" }}
                  startIcon={<SaveIcon />}
                  onClick={OnSubmitHandler}
                >
                  SAVE
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
