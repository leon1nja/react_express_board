import WarningIcon from '@mui/icons-material/Warning';
import Tooltip from '@mui/material/Tooltip';
import './style.scss'

const Duplicated = (props) => {
    return (
        <Tooltip title="Duplicated">
            <WarningIcon fontSize='small' color='primary' className="duplicated" />
        </Tooltip>
    )
}

export default Duplicated;