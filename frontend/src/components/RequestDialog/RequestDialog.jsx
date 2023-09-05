import "./requestdialog.scss"
import * as React from 'react';
import { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { requestInputs } from "../../formSource";
import { useDispatch, useSelector } from "react-redux";
import { AddRequestAction } from "../../redux/actions/RequestAction";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";
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

export default function RequestDialog({ children }) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({ truck_num: "", location: "", date: "", notes: "" })
    const { token } = useSelector(state => state.UserReg)
    const { Trucks } = useSelector(state => state.ListReducer)

    const [trucks,setTrucks]=useState([])

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

        dispatch(AddRequestAction(state, token))
        setOpen(false);

    }
    useEffect(()=>{
        var arr=[]
        Trucks.map(trailer=>arr.push(trailer.name))
      setTrucks([...arr])
      },[Trucks])
    return (
        <div>
            <Button variant="contained" color="secondary" sx={{ borderRadius: '25px' }} startIcon={<AddCircleOutlineIcon />}  onClick={handleClickOpen}>
                Add Line
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Request Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">

                        <div className="right2">
                            <form>

                            <Autocomplete
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    onChange={(event, newValue) => {
                    setState({...state,truck_num:newValue});
                  }}
                 
                  id="controllable-states-demo"
                  options={trucks}
                  sx={{ width: 200 }}
                  renderInput={(params) => <TextField {...params}  label="Truck #" />}
                />
                                {requestInputs.map((input) => (
                                    
                                        <TextField key={input.id} label={input.label} type={input.type} onChange={OnChangeHandler} placeholder={input.placeholder} name={input.name} />
                                   
                                ))}

                                <Button variant="contained" color="success" size="medium" sx={{borderRadius:"15px"}} onClick={OnSubmitHandler}>ADD to list</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
