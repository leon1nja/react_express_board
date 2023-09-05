import "./trailerdialog.scss"
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
import HelperUtah from "../dialog/HelperUtah";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { AddTrailerAction } from "../../redux/actions/TrailerActions";
import { Autocomplete, TextField, FormControlLabel, Switch } from "@mui/material";
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

export default function TrailerDialog({ children }) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({ truck_num: "", trailer: "", vendor: {}, empty: "", notes: "" })
    const { token ,logics} = useSelector(state => state.UserReg)
    const { Trailers, Trucks, Vendors } = useSelector(state => state.ListReducer)
    const { trailers} = useSelector(state => state.TrailerReducer)

    const [trailers2, setTrailers] = useState([])
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
        if(trailers.length >= logics.utahtrailer){
            dispatch({type:"TTRAILER_DIALOG",payload:true})
            e.preventDefault()
            dispatch(AddTrailerAction(state, token))
            setOpen(false);
            setState({ truck_num: "", trailer: "", vendor: {}, empty: "", notes: "" })
        }else{
            e.preventDefault()
            dispatch(AddTrailerAction(state, token))
            setOpen(false);
            setState({ truck_num: "", trailer: "", vendor: {}, empty: "", notes: "" })
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
        <div className="helper">
           <div className="helpertext">
            <HelperUtah />
            <Button variant="contained" color="secondary" sx={{ borderRadius: '25px'}} className="addLineButton" startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>
                Add Trailer
            </Button>
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Trailer Form
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
                                    options={trailers2}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField  {...params} label="Trailer #" />}
                                />
                           
                              
                             <Autocomplete
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, vendor: Vendors.filter(vendor => vendor.name === newValue)[0] });
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
                                    renderInput={(params) => <TextField  {...params} label="By Truck #" />}
                                />
                                 <FormControlLabel sx={{width:"200px"}} control={<Switch checked={checkedDispatch}
                                    onChange={handleChangePickedup}
                                    inputProps={{ 'aria-label': 'controlled' }} color="secondary" />} label="Empty" />
                             
                             <TextField variant="outlined" fullWidth multiline type='text' onChange={OnChangeHandler} rows={2} id="filled-multiline-static" label="Notes" name="notes" />

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
