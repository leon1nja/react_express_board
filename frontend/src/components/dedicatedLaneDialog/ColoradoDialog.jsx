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
import { Autocomplete, TextField, FormControlLabel, Switch, getLinearProgressUtilityClass } from "@mui/material";
import { AddColoradoAction } from "../../redux/actions/DedicatedLaneActions";
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

export default function ColoradoDialog({ children }) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({ truck_num: "", trailer: "", location: {}, empty: "", notes: "" })
    const { token ,logics} = useSelector(state => state.UserReg)
    const { Trailers, Trucks ,Vendors} = useSelector(state => state.ListReducer)
    const { coloradoses} = useSelector(state => state.DedicatedLaneReducer)
    const [trailers, setTrailers] = useState([])

    const [trucks, setTrucks] = useState([])
    const [vendors, setVendors] = useState([])

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
if(coloradoses.length >= logics.colorado){
    dispatch({type:"TCOLORADO_DIALOG",payload:true})
    e.preventDefault()
    dispatch(AddColoradoAction(state, token))
    setOpen(false);
    setState({ truck_num: "", trailer: "", location: {}, empty: "", notes: "" })
}else{
    e.preventDefault()
    dispatch(AddColoradoAction(state, token))
    setOpen(false);
    setState({ truck_num: "", trailer: "", location: {}, empty: "", notes: "" })
}
    }
    useEffect(() => {
        var arr1 = []
        Trailers.map(trailer => arr1.push(trailer.name))
        setTrailers([...arr1])
        var arr2 = []
        Trucks.map(truck => arr2.push(truck.name))
        setTrucks([...arr2])
        var arr3 = []
        Vendors.map(vendor => arr3.push(vendor.name))
        setVendors([...arr3])

    }, [Trailers, Trucks, Vendors])
    const [checkedDispatch, setCheckedDispatch] = React.useState(false);
    const handleChangePickedup = (e) => {
        if (e.target.checked) {
            setState({ ...state, empty: "e" })
            setCheckedDispatch(e.target.checked)
        } else {
            setState({ ...state, empty: "" })
            setCheckedDispatch(e.target.checked)
        }
    }
    useEffect(() => {
        if (state.empty === "e") {
            setCheckedDispatch(true)

        } else {
            setCheckedDispatch(false)
        }

    }, [state.empty])
    return (
        <div>
            <Button variant="contained" color="secondary" className="addLineButton" sx={{ borderRadius: '25px' }} startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>
                Add Trailer
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Colorado Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">

                        <div className="right2">
                            <form>
                                <Autocomplete
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, trailer: newValue });
                                    }}

                                    id="controllable-states-demo"
                                    options={trailers}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField  {...params} label="Trailer #" />}
                                />
                               <Autocomplete
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, location: Vendors.filter(vendor => vendor.name === newValue)[0] });
                                    }}

                                    id="controllable-states-demo"
                                    options={vendors}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Location" />}
                                />
                                <Autocomplete
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, truck_num: newValue });
                                    }}
                                    
                                    id="controllable-states-demo"
                                    options={trucks}
                                     sx={{ width: 200 }}
                                    renderInput={(params) => <TextField fullWidth  {...params} label="By Truck #" />}
                                />
                                <FormControlLabel sx={{ width: "200px" }} control={<Switch checked={checkedDispatch}
                                    onChange={handleChangePickedup}
                                    inputProps={{ 'aria-label': 'controlled' }} color="secondary" />} label="Empty" />

                                <TextField variant="outlined" fullWidth multiline type='text' onChange={OnChangeHandler} rows={2} id="filled-multiline-static" label="Notes" name="notes" value={state.notes} />



                                <Button variant="contained" color="success" sx={{ borderRadius: "15px" }} startIcon={<SaveIcon />} onClick={OnSubmitHandler}>ADD</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
