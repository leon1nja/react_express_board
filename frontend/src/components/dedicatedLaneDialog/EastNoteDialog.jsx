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
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { EditCalendarTextEastCalendar } from "../../redux/actions/EastCalendarActions";
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

export default function EastNoteDialog({ children }) {
    const [text, setText] = React.useState("")
    const { token } = useSelector(state => state.UserReg)
    const { EditNotepadModal, calendarText } = useSelector(state => state.EastCalendarReducer)
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({type:"EDIT_EASTNOTEPAD_MODAL", payload: {open: false, id: ""}})
    };
   
    const OnSubmitHandler = async (e) => {
        e.preventDefault();
        let tempText = calendarText;
        tempText.text = text;
        dispatch(EditCalendarTextEastCalendar(tempText, token));
        dispatch({type:"EDIT_EASTNOTEPAD_MODAL", payload: {open: false, id: ""}});
        setText("");
    }

    useEffect(() => {
        setText(calendarText.text);
    }, [calendarText])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={EditNotepadModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Note
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">
                        <div className="right2">
                            <form>
                                <TextField label="notes" onChange={e=>setText(e.target.value)} value={text} variant="outlined" />
                                <Button variant="contained" color="success" sx={{ borderRadius: "15px", height: "50px", marginTop: "auto", marginBottom: "auto" }} startIcon={<SaveIcon />} onClick={OnSubmitHandler}>SAVE</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
