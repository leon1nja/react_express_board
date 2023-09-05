import "./Dialog.scss";
import * as React from "react";
import { useEffect, useState } from "react";
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
import { Autocomplete, TextField } from "@mui/material";
import { editTIllinoisAction } from "../../redux/actions/DedicatedLaneActions";
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

export default function ExtraTruckEditDialog({ children }) {
  // const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({ truck_num: "", notes: "" });
  /*eslint-disable no-unused-vars*/
  const { token, logics } = useSelector((state) => state.UserReg);
  const { Trucks } = useSelector((state) => state.ListReducer);
  const { EditExtraTruckModal, tillinoise } = useSelector(
    (state) => state.DedicatedLaneReducer
  );

  const [trucks, setTrucks] = useState([]);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "EDIT_EXTRA_TRUCK_MODAL", payload: { open: false } });
  };

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(editTIllinoisAction(tillinoise._id, state, token));
    dispatch({ type: "EDIT_EXTRA_TRUCK_MODAL", payload: { open: false } });
    setState({ truck_num: "", notes: "" });
  };

  useEffect(() => {
    var arr1 = [];
    Trucks.map((trailer) => arr1.push(trailer.name));
    setTrucks([...arr1]);
  }, [Trucks]);

  useEffect(() => {
    tillinoise.truck_num && setState({ ...tillinoise });
  }, [tillinoise]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={EditExtraTruckModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Mandatory Truck
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="bottom">
            <div className="right2">
              <form>
                <Autocomplete
                  onChange={(event, newValue) => {
                    setState({ ...state, truck_num: newValue });
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  value={state.truck_num}
                  id="controllable-states-demo"
                  options={trucks}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Trucks #" />
                  )}
                />

                <TextField
                  label="notes"
                  onChange={(e) =>
                    setState({ ...state, notes: e.target.value })
                  }
                  value={state.notes}
                  variant="outlined"
                />

                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: "15px" }}
                  startIcon={<SaveIcon />}
                  onClick={OnSubmitHandler}
                >
                  Save Changes
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
