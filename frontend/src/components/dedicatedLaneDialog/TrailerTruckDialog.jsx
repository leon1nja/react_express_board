import "./Dialog.scss"
import * as React from 'react';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { EditTTrailerAction } from "../../redux/actions/TrailerActions";
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

export default function TrailerTruckDialog({ children }) {
    const [state, setState] = React.useState({ truck_num: "" , notes:"", id: ""})
    const { token } = useSelector(state => state.UserReg)
    const { Trucks } = useSelector(state => state.ListReducer)
    const { EditTrailerTruckModal, ttrailer } = useSelector(state => state.TrailerReducer)
    const [trucks, setTrucks] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(ttrailer) {
           if(ttrailer.truck_num || ttrailer.notes || ttrailer._id){
                setState({...state, truck_num: ttrailer?.truck_num, notes: ttrailer?.notes, id: ttrailer?._id})
           }
        }
    }, [ttrailer])

  
    const handleClose = () => {
        dispatch({type:"EDIT_TRAILER_TRUCK_MODAL", payload: {open: false, id: ""}})
    };
   
    const OnSubmitHandler = async (e) => {
        e.preventDefault()
        dispatch(EditTTrailerAction(state, token));
        dispatch({type:"EDIT_TRAILER_TRUCK_MODAL", payload: {open: false, id: ""}})
        setState({ truck_num: "" , notes:"", id: ""});
    }

    useEffect(() => {
        var arr1 = []
        Trucks.map(trailer => arr1.push(trailer.name))
        setTrucks([...arr1]);
    }, [Trucks])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={EditTrailerTruckModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Truck
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">

                        <div className="right2">
                            <form>

                                <Autocomplete
                                    value={state.truck_num}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, truck_num: newValue });
                                    }}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    id="controllable-states-demo"
                                    options={trucks}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField  {...params} label="Trucks #" />}
                                />


            
                                <TextField label="notes" onChange={e=>setState({...state,notes:e.target.value})} value={state.notes} variant="outlined" />


                                <Button variant="contained" color="success" sx={{ borderRadius: "15px" }} startIcon={<SaveIcon />} onClick={OnSubmitHandler}>SAVE</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
