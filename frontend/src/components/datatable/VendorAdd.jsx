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
import {  vendorInputs } from "../../formSource";
import { useDispatch, useSelector } from "react-redux";
import { AddVendorListAction } from "../../redux/actions/ListActions";
import {CirclePicker} from 'react-color'
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

export default function VendorAdd({ children }) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({ name:"",color:"#e91e63" })
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

    dispatch(AddVendorListAction(state, token))
    setOpen(false);

  }

  return (
    <div>
      <Button variant="outlined" color="secondary" sx={{ borderRadius: '15px' }} onClick={handleClickOpen}>
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


                {vendorInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} onChange={OnChangeHandler} placeholder={input.placeholder} name={input.name} />
                  </div>
                ))}
                <div className="formInput" >
                    <label>Location Color</label>
<CirclePicker width="200px" circleSpacing={16} circleSize={20} onChange={e=>setState({...state,color:e.hex})} color={state.color} colors={[ "#e91e63", "#9c27b0", "#673ab7", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]}/>
                  </div>
                <Button variant="outlined" color="secondary" size="small" sx={{ borderRadius: '15px' }} onClick={OnSubmitHandler}>ADD</Button>
              </form>
            </div>
          </div>
        </DialogContent>
        {children}
      </BootstrapDialog>
    </div>
  );
}
