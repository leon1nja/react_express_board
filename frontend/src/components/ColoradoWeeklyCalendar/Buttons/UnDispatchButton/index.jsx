import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

const UnDispatchButton = (props) => {
    return (
        <Tooltip title="Restore">
            <IconButton aria-label="dispatch"
                className='dispatchButton'
                color="primary"
                onClick={(e)=>props.onClickHandle()}
            > 
                <ReplayOutlinedIcon />
            </IconButton>
        </Tooltip>
    )
}

export default UnDispatchButton;