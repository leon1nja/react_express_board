import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

const DeleteInfoButton = (props) => {
    return (
        <Tooltip title="Delete">
            <button className="customizedButton" onClick={(e)=>props.onClickHandle()}><CloseIcon fontSize='small' /></button>
        </Tooltip>
        )
}

export default DeleteInfoButton;