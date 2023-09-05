import "./editrequestdialog.scss"
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

import { EditRequestAction } from "../../redux/actions/RequestAction";
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

export default function EditRequestDialog({ children }) {
    const [state, setState] = React.useState({ truck_num: "", location: "", date: "", notes: "" })
    const { token } = useSelector(state => state.UserReg)
    const { EditRequestModal, request } = useSelector(state => state.RequestReducer)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({ type: "EDIT_REQUEST_MODAL", payload: { open: false } })
    };
    const OnChangeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const OnSubmitHandler = async (e) => {

        e.preventDefault()

        dispatch(EditRequestAction(state, request._id, token))
        dispatch({ type: "EDIT_REQUEST_MODAL", payload: { open: false } })

    }
    React.useEffect(() => {
        setState({...state,  truck_num: request.truck_num, location: request.location, date: request.date, notes: request.notes })
    }, [request])
    if (!state.truck_num) {
        return null
    }
    return (
        <div>
       
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={EditRequestModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Request Edit Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">

                        <div className="right">
                            <form>



                                
                                    <TextField inputProps={
                                    { readOnly: true, }
                                }  label="Truck #" type="text" value={state.truck_num} name="truck_num" />
                             
                                    <TextField label="Location" type="text" value={state.location} onChange={OnChangeHandler} name="location" />
                             
                                    <TextField label="Date" type="text" value={state.date} onChange={OnChangeHandler} name="date" />
                                
                                    <TextField variant="outlined" value={state.notes} type='text' onChange={OnChangeHandler} rows={2} id="filled-multiline-static" label="Notes" name="notes" />

                                <Button variant="contained" color="success" sx={{borderRadius:"15px"}} startIcon={<SaveIcon />} onClick={OnSubmitHandler}>SAVE edits</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
