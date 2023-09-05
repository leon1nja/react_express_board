import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const DeleteRowButton = (props) => {
    return (
        <Tooltip title="Delete">
            <IconButton
                aria-label="Delete Load"
                color="error"
                className="deleteRowButton"
                onClick={(e)=>props.onClickHandle()}
            >
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteRowButton;
