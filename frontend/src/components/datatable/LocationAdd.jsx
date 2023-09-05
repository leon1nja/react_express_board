import "./Addlog.scss"
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { locationListInputs } from "../../formSource";
import { useDispatch, useSelector } from "react-redux";
import { AddLocationListAction } from "../../redux/actions/ListActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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
            position: 'absolute',
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

export default function LocationAdd({ children }) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({ location: ""})
  const { token } = useSelector(state => state.UserReg)
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const OnChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const OnSubmitHandler = async (e) => {

    e.preventDefault()

    dispatch(AddLocationListAction(state, token))
    setOpen(false);

  }

  return (
    <div>
      <Button variant="outlined"  color="secondary" sx={{ borderRadius: '15px' }} onClick={handleClickOpen}>
        Add Location
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Location Form
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="bottom">

            <div className="right">
              <form>


                {locationListInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} onChange={OnChangeHandler} placeholder={input.placeholder} name={input.name} />
                  </div>
                ))}

                <Button variant="contained" color="success" onClick={OnSubmitHandler}>ADD</Button>
              </form>
            </div>
          </div>
        </DialogContent>
        {children}
      </BootstrapDialog>
    </div>
  );
}
