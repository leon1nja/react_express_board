import "./locationEdit.scss"
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
import { useDispatch, useSelector } from "react-redux";
import { EditLocationAction } from "../../redux/actions/DedicatedLaneActions";

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

export default function LocationEdit({ children }) {
    const [state, setState] = React.useState({ location: "" })
    const { token } = useSelector(state => state.UserReg)
    const { EditLocationModal, location ,id2} = useSelector(state => state.DedicatedLaneReducer)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({ type: "EDIT_LOCATION_MODAL", payload: { open: false, obj:{ location: "", _id: "" } } })
    };
    
    const OnSubmitHandler = async (e) => {

        e.preventDefault()
        dispatch(EditLocationAction({ location: state.location }, id2, token, state.truck))
        dispatch({ type: "EDIT_LOCATION_MODAL", payload: { open: false, obj:{ location: "", _id: "" }} })
        setState({ ...state, location:""})
    }
 

    React.useEffect(() => {
        setState({ ...state, location: location})
    }, [location])



  
  
    return (
        <div>
          
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={EditLocationModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                   Dedicated Lanes Location
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="bottom">

                        <div className="right">
                            <form>

                                <div className="formInput" >
                                    <label>Location</label>
                                    <input type="text" value={state.location} name="location" onChange={(e) => setState({ ...state, location: e.target.value })} />
                                </div>

                                <Button variant="contained" color="success" sx={{ borderRadius: "15px" }} startIcon={<SaveIcon />} onClick={OnSubmitHandler} >SAVE</Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                {children}
            </BootstrapDialog>
        </div>
    );
}
