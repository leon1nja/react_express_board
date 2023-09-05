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
import { AddCalendarTextEastCalendar } from "../../redux/actions/EastCalendarActions";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

export default function EastNoteAddDialog({ children }) {
    const [text, setText] = React.useState("");
    const [ open, setOpen ] = useState(false);
    const { token } = useSelector(state => state.UserReg);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };
   
    const OnSubmitHandler = async (e) => {
        e.preventDefault()
        dispatch(AddCalendarTextEastCalendar(text, token));
        setOpen(false);
        setText("");
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button variant="contained" color="secondary" className="addLineButton" sx={{ borderRadius: '25px' }} startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>
                Add Note
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Note
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
