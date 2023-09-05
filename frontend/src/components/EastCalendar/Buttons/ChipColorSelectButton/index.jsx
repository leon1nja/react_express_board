import "./style.scss";
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeTruckColorEastCalendar, ChangeLoadColorEastCalendar } from '../../../../redux/actions/EastCalendarActions';
import { colorArray } from "../../../../constants";

const ChipColorSelectButton = (props) => {
    const { token } = useSelector(state => state.UserReg);
    const [ palette, setPalette ] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        setPalette(false);
    },[])


    const onClickHandle = (type) => {
        if(!palette) setPalette(true);
        else setPalette(false);
    }

    window.onclick = function(event) {
        if (event.target.id !== "colorSelect") {
            setPalette(false);
        }
    }

    const selectColor = (name, type) => {
        if(type === "trucks") {
            let selectedTruck = props.selectedTruck;
            let trucks = props.trucks;
            selectedTruck.status = name;
            dispatch(ChangeTruckColorEastCalendar(trucks, selectedTruck.value, props.id, token));
            setPalette(false);
        }else{
            let changedLoad = props.load;
            changedLoad.status = name;
            dispatch(ChangeLoadColorEastCalendar(changedLoad, props.id, token));
            setPalette(false);
        }
    }

    return (
        <div className='colorField' id="colorSelect">
            <Tooltip title="Change Status">
                <div className='colorSelectField'> 
                    <button className="customizedButton colorSelectButton" id="colorSelect" onClick={(e)=>onClickHandle()}><PaletteOutlinedIcon id="colorSelect" fontSize='small' /></button>
                </div>
            </Tooltip>
            {palette && (
                <div className='palette' id="colorSelect">
                    {
                        colorArray.map((item, index)=>{
                            return(
                                <button key={index} className={"colorButton " + item.className} id="colorSelect" name={item.name} onClick={(e)=>selectColor(e.target.name, props.type)}></button>
                            )
                        })
                    }
                    <div className="triangle-up"></div>
                </div>  
            )}
        </div>
    )
}

export default ChipColorSelectButton;