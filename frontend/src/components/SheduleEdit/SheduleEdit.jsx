import "./sheduleedit.scss"
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from "react-redux";
import { TextField, FormControl } from "@mui/material";
import { EditSheduleAction } from "../../redux/actions/DedicatedLaneActions";
import { useEffect } from "react";
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";
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

export default function SheduleEdit({ children }) {
    const [state, setState] = React.useState({ truck: "", color: "", textColor: "black", font: "" })
    const { token } = useSelector(state => state.UserReg)
    const { EditSheduleModal, shedule, field, id } = useSelector(state => state.DedicatedLaneReducer)
    const { requests } = useSelector(state => state.RequestReducer)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({ type: "EDIT_SHEDULE_MODAL", payload: { open: false, data: {}, field: "", id: "" } })
    };

    const OnSubmitHandler = async (e) => {
        e.preventDefault()
        dispatch(EditSheduleAction({ [field]: state }, id, token, state.truck, shedule.truck))
        dispatch({ type: "EDIT_SHEDULE_MODAL", payload: { open: false, data: {}, field: "", id: "" } })
        setState({ ...state, truck: "", textColor: "black" })
    }
    React.useEffect(() => {

        let obj = requests.find((request) => request.truck_num === state.truck)
        if (obj) {
            setState({ ...state, textColor: "red" })
        } else { setState({ ...state, textColor: "black" }) }

    }, [state.truck])
    React.useEffect(() => {
        setState({ ...state, truck: shedule.truck, color: shedule.color, font: shedule.font })
    }, [shedule])



    const [checkedDispatch, setCheckedDispatch] = React.useState(false);
    const [checkedPickedup, setCheckedPickedup] = React.useState(false);

    const handleChangeDispatch = (event) => {
        if (event.target.checked) {
            setState({ ...state, color: "#90EE90" })
            setCheckedDispatch(event.target.checked);

        } else {
            setState({ ...state, color: "white" })
            setCheckedDispatch(event.target.checked);
        }

    };
    const handleChangePickedup = (event) => {
        if (event.target.checked) {
            setState({ ...state, font: "bold" })
            setCheckedPickedup(event.target.checked);

        } else {
            setState({ ...state, font: "normal" })
            setCheckedPickedup(event.target.checked);
        }
    };
    useEffect(() => {
        if (state.color === "white") {
            setCheckedDispatch(false)

        } else {
            setCheckedDispatch(true)
        }
        if (state.font === "normal") {
            setCheckedPickedup(false)

        } else {
            setCheckedPickedup(true)

        }
    }, [state])

    //Reset Handler
    const OnResetHandler = () => {
        setState({ ...state, truck: "X", color: "white", textColor: "black", font: "normal" })
        setCheckedDispatch(false)
        setCheckedPickedup(false)
    }

    return (
        <div>
            {/* <Button variant="contained" color="secondary" sx={{borderRadius: '25px'}} onClick={handleClickOpen}>
        Add Line
      </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={EditSheduleModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {field.toUpperCase()} SCHEDULE
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">

                        <div className="right">
                            <form>


                                <TextField label="Truck #" type="text" value={state.truck} name="truck_num" onChange={(e) => setState({ ...state, truck: e.target.value })} />


                                <FormControl className="formInput">
                                    <FormControlLabel control={<Switch checked={checkedDispatch}
                                        onChange={handleChangeDispatch}
                                        inputProps={{ 'aria-label': 'controlled' }} color="secondary" />} label="Dispatched" />

                                    <FormControlLabel control={<Switch checked={checkedPickedup}
                                        onChange={handleChangePickedup}
                                        inputProps={{ 'aria-label': 'controlled' }} color="secondary" />} label="Picked Up" />
                                </FormControl>
                                <Button variant="contained" color="success" sx={{ borderRadius: "5px" }} startIcon={<SaveIcon />} onClick={OnSubmitHandler} >SAVE</Button>
                                <Button variant="contained" sx={{ borderRadius: "5px", color: "primary" }} startIcon={<RestartAltIcon />} onClick={OnResetHandler} >Reset</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
