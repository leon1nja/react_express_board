import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const LoadDispatchButton = (props) => {
    return (
        <Tooltip title="Dispatch">
            <IconButton aria-label="dispatch"
                className='dispatchButton'
                color="success"
                onClick={(e)=>props.onClickHandle()}
            > 
                <DoubleArrowIcon />
            </IconButton>
        </Tooltip>
    )
}

export default LoadDispatchButton;
