import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import DeleteInfoButton from "../Buttons/DeleteInfoButton";
import ChipColorSelectButton from "../Buttons/ChipColorSelectButton";
import Multiselect from 'multiselect-react-dropdown';
import {ToastHandler} from "../../../redux/ToastHandler";
import { UpdateTrucksMidwestCalendar, AddTruckInfoMidwestCalendar } from '../../../redux/actions/MidwestCalendarActions';
import { getCurrentWeek, getNextWeek } from '../../../functionLib';

const CalendarTruck = (props) =>  {
    const [ suggetions, setSuggestions ] = useState([]);
    const [ selectedChips, setSelectedChips ] = useState([]);
    const [ truckInfo, setTruckInfo ] = useState("");
    const [ selectedValues, setSelectedValues ] = useState([]);
    const [ currentWeekInfos, setCurrentWeekInfos ] = useState([]);
    const [ nextWeekInfos, setNextWeekInfos ] = useState([]);
    const [ autoSelectFlag, setAutoSelectFlag ] = useState(false);
    const { Trucks } = useSelector((state) => state.ListReducer);
    const { token } = useSelector(state => state.UserReg);
    const { weeklyCalendarInfos } = useSelector(state => state.MidwestCalendarReducer);
    const currentWeekDates = getCurrentWeek('ddd MMM D');
    const nextWeekDates = getNextWeek('ddd MMM D');
    const dispatch = useDispatch();

    useEffect(()=>{
        let currentWeekDatas = [];
        currentWeekDates.forEach((date=>{
            let currentWeekInfo = weeklyCalendarInfos.filter((info)=>info.date === date);
            currentWeekInfo.map((item)=>{
                currentWeekDatas.push(item);
            })
        }))
        setCurrentWeekInfos(currentWeekDatas);
        let nextWeekDatas = [];
        nextWeekDates.forEach((date=>{
            let nextWeekInfo = weeklyCalendarInfos.filter((info)=>info.date === date);
            nextWeekInfo.map((item)=>{
                nextWeekDatas.push(item);
            })
        }))
        setNextWeekInfos(nextWeekDatas);
    }, [weeklyCalendarInfos])

    useEffect(()=>{
        let chipValues = [];
        props.items.forEach((item)=>{
            chipValues.push(item.value);
        })
        setSelectedValues(chipValues);
    },[props.items])

    useEffect(()=>{
        let tempArray = [];
        Trucks.forEach((item)=>{
            tempArray.push(item.name);
        })
        setSuggestions(tempArray);
    }, [Trucks])

    const onSelectHandle = (chips) =>{
        const judgeChip = chips[chips.length-1]
        let i = 0;
        if(props.weekHandle === 'current'){
            currentWeekInfos.map((info)=>{
            info.trucks.map((item)=>{
                if(judgeChip === item.value) i++;
            })
            })
        } else {
            nextWeekInfos.map((info)=>{
                info.trucks.map((item)=>{
                    if(judgeChip === item.value) i++;
                })
                })
        }
        if(i !== 0) {
            ToastHandler({status: null, msg: 'The truck already exists!'});
        } else {
            let sendValues = chips.map(el => ({ value: el }));
            sendValues.forEach((item)=>{
                if(props.items.length === 0) {
                    item.status = "created";
                } else{
                    item.status = props.items[0].status;
                    item.info = props.items[0].info;
                }
            })
            setSelectedChips(sendValues);
        }
    }

    const onRemoveHandle = (chips) => {
        setSelectedChips([]);
    }

    const trucksEditHandle = () =>{
        if (!autoSelectFlag) {
            setAutoSelectFlag(true);
        }else {
            setAutoSelectFlag(false);
        }
    }

    const setAddText = () => {
        if(truckInfo) {
            if(selectedChips.length > 0){
                let tempChips = selectedChips;
                tempChips[0].info = truckInfo;
                dispatch(UpdateTrucksMidwestCalendar(tempChips, props.id, token));
                setAutoSelectFlag(false);
            } else {
                if(props.items[0]?.value) {
                    dispatch(AddTruckInfoMidwestCalendar(truckInfo, props.id, token));
                    setAutoSelectFlag(false);
                }
                else ToastHandler({status: null, msg: 'Please input truck first!'});
            }
            
        } else {
            if(props.items[0]?.info) {
                if(selectedChips.length > 0) {
                    let tempChips = selectedChips;
                    tempChips[0].info = truckInfo;
                    dispatch(UpdateTrucksMidwestCalendar(tempChips, props.id, token));
                    setAutoSelectFlag(false);
                } else {
                    if(props.items[0]?.value) {
                        dispatch(AddTruckInfoMidwestCalendar(truckInfo, props.id, token));
                        setAutoSelectFlag(false);
                    }
                    else ToastHandler({status: null, msg: 'Please input truck first!'});
                }
            } else {
                if(selectedChips.length > 0) {
                    dispatch(UpdateTrucksMidwestCalendar(selectedChips, props.id, token));
                    setAutoSelectFlag(false);
                } else {
                    ToastHandler({status: null, msg: 'Please input truck first!'});
                }
            }
        }
        setSelectedChips([]);
    }

    return (
        <div className="truckField" onDoubleClick={(e)=>trucksEditHandle()}>
            {autoSelectFlag && 
                (
                    <div className='infoField'>
                        <Multiselect
                            className='multiSelectField'
                            options={suggetions}
                            selectedValues={selectedValues} // Preselected value to persist in dropdown
                            onSelect={onSelectHandle} // Function will trigger on select event
                            onRemove={onRemoveHandle} // Function will trigger on remove event
                            selectionLimit={1}
                            isObject={false}
                        />

                        <div className='addTextField'>
                            <input type="text" className='truckInput' placeholder='Add info' defaultValue={props.items[0]?.info} onChange={(e)=>setTruckInfo(e.target.value)} />
                            <button onClick={(e)=>setAddText()}>OK</button>
                        </div>
                    </div>
                )
            }
            {!autoSelectFlag &&
                <div className="dragZone" onDrop={(ev)=>props.drop(ev, props.id)} onDragOver={props.ondragover}>
                {props.items.map((item, key) => {
                    return (
                        <div id={props.turn + "-" + props.index + "-" + key} key={key} className={"card " + item.status} draggable="true" onDragStart={(ev)=>props.drag(ev, item, props.id)}>
                            <div className='cardText'>{item.value + " " + (item.info ? item.info : "")}</div>
                            <ChipColorSelectButton type={'trucks'} id={props.id} selectedTruck={item} trucks={props.items} />
                            <DeleteInfoButton onClickHandle={()=>props.onClickHandle(item)} />
                        </div>
                    )
                })}
            </div>
            }
        </div>
    );
}

export default CalendarTruck;