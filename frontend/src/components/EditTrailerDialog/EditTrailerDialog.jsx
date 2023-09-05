import "./edittrailerdialog.scss"
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { useDispatch, useSelector } from "react-redux";
import { EditTrailerAction } from "../../redux/actions/TrailerActions";
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";
import { useEffect } from "react";
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

export default function EditTrailerDialog({ children }) {
    const [state, setState] = React.useState({ truck_num: "", trailer: "", vendor: {}, empty: "", notes: "" })
    const { token } = useSelector(state => state.UserReg)
    const { EditTrailerModal, trailer } = useSelector(state => state.TrailerReducer)
    const { Vendors, Trucks ,Trailers} = useSelector(state => state.ListReducer)
    const [trucks, setTrucks] = useState([])
    const [trailers, setTrailers] = useState([])

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({ type: "EDIT_TRAILER_MODAL", payload: { open: false } })
    };
    const OnChangeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const OnSubmitHandler = async (e) => {

        e.preventDefault()

        dispatch(EditTrailerAction(state, trailer._id, token))
        dispatch({ type: "EDIT_TRAILER_MODAL", payload: { open: false } })

    }

    React.useEffect(() => {
        if (trailer.vendor) {

            setState({ ...state, vendor: trailer.vendor, truck_num: trailer.truck_num, trailer: trailer.trailer, empty: trailer.empty, notes: trailer.notes })
        }

    }, [trailer])
    useEffect(() => {
        var arr = []
        Trucks.map(truck => arr.push(truck.name))
        setTrucks([...arr])
        var arr1 = []
        Trailers.map(trailer => arr1.push(trailer.name))
        setTrailers([...arr1])
    }, [Trucks,Trailers])
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

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={EditTrailerModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Trailer Edit Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">

                        <div className="right2">
                            <form>


                                {/* <TextField inputProps={
                                    { readOnly: true, }
                                } label="Trailer" variant="outlined" type="text" defaultValue={state.trailer} name="trailer" /> */}

<Autocomplete
                                    value={state.trailer}
                                    onChange={(event, newValue) => {
                                        setState({ ...state, trailer: newValue });
                                    }}

                                    id="controllable-states-demo"
                                    options={trailers}
                                    className="autocompleteInput"
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField  {...params} label="Trailer #" />}
                                />
                                <FormControl className="formInput">
                                    <InputLabel id="demo-simple-select-label" placeholder="Location">Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state.vendor.name}
                                        label="Location"
                                        onChange={(e) => setState({ ...state, vendor: Vendors.filter(vendor => vendor.name === e.target.value)[0] })}
                                        placeholder="Location"
                                    >
                                        {
                                            Vendors.map((vendor) => (
                                                <MenuItem key={vendor._id} value={vendor.name}>{vendor.name}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>


                                <Autocomplete
                                    value={state.truck_num}
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
                                <TextField variant="outlined" value={state.notes} fullWidth multiline type='text' onChange={OnChangeHandler} rows={2} id="filled-multiline-static" label="Notes" name="notes" />

                                <Button variant="contained" color="success" sx={{ borderRadius: "15px" }} startIcon={<SaveIcon />} onClick={OnSubmitHandler}>SAVE changes</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
