import "./ColoradoWeeklyCalendar.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { headerArray } from "../../constants";
import CalendarTruck from './CalendarTruck';
import DeleteInfoButton from './Buttons/DeleteInfoButton';
import DeleteRowButton from './Buttons/DeleteRowButton';
import LoadDispatchButton from './Buttons/LoadDispatchButton';
import UnDispatchButton from './Buttons/UnDispatchButton';
import Duplicated from "./Buttons/Duplicated";
import ChipColorSelectButton from './Buttons/ChipColorSelectButton';
import { getNextWeek, getWeeks, getCurrentWeek, addYear } from "../../functionLib";
import { AddRowToColoradoCalendar, 
    DeleteRowColoradoCalendar, 
    LoadDispatchColoradoCalendar, 
    DeleteTrucksInfoColoradoCalendar,
    DeleteLoadInfoColoradoCalendar, 
    DragAndDropColoradoCalendar, 
    UpdateLoadColoradoCalendar,
    AddLoadInfoColoradoCalendar,
    UnDispatchColoradoCalendar,
    DeleteLoadAddInfoColoradoCalendar,
    DeleteCalendarTextColoradoCalendar
 } from "../../redux/actions/ColoradoCalendarActions";
import { ToastHandler } from "../../redux/ToastHandler";
import { Button, Tooltip } from "@mui/material";
import { coloradoTextColumns } from '../../datatablesource';
import ColoradoNoteDialog from "../dedicatedLaneDialog/ColoradoNoteDialog";
import ColoradoNoteAddDialog from "../dedicatedLaneDialog/ColoradoNoteAddDialog";

const ColoradoWeeklyCalendar = () => {
    const [ dragItem, setDragItem ] = useState([]);
    const [ dragId, setDragId ] = useState("");
    const [ editedLoad, setEditedLoad ] = useState({});
    const [ loadInfo, setLoadInfo ] = useState("");
    const [ blank, setBlank ] = useState(false);
    const [ currentWeekTruckLoadData, setCurrentWeekTruckLoadData ] = useState([]);
    const [ nextWeekTruckLoadData, setNextWeekTruckLoadData ] = useState([]);
    const [ autoSelectFlag, setAutoSelectFlag ] = useState(false);
    const [ currentWeekLoads, setCurrentWeekLoads ] = useState([]);
    const [ nextWeekLoads, setNextWeekLoads ] = useState([]);
    const [ currentWeekLoadInfo, setCurrentWeekLoadInfo ] = useState([]);
    const [ nextWeekLoadInfo, setNextWeekLoadInfo ] = useState([]);
    const { token } = useSelector(state => state.UserReg);
    const { weeklyCalendarInfos, calendarTexts } = useSelector((state) => state.ColoradoCalendarReducer)
    const dispatch = useDispatch();
    const currentWeekDates = getCurrentWeek('ddd MMM D Y');
    const nextWeekDates = getNextWeek('ddd MMM D Y');

    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          headerClassName: "header",
    
          width: 100,
          renderCell: (params) => {
            return (
              <Stack direction="row" spacing={2}>
                <Tooltip title="Edit">
                  <IconButton
                    aria-label="Edit Row"
                    color="primary"
                    onClick={(e) => {
                        editText(params.row._id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
    
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="Delete Load"
                    color="error"
                    onClick={(e) => {
                        deleteText(params.row._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        },
      ];

    useEffect(()=>{
        let currentWeekLoadArray = [];
        let nextWeekLoadArray = [];
        let currentWeekLoadInfoArray = [];
        let nextWeekLoadInfoArray = [];
        currentWeekDates.map((date)=>{
            weeklyCalendarInfos.forEach((item)=>{
                if(item.load && item.date === date) currentWeekLoadArray.push(item.load.value);
            })
            weeklyCalendarInfos.forEach((item)=>{
                if(item.load && item.date === date) currentWeekLoadInfoArray.push(item.load.info);
            })
        })
        nextWeekDates.map((date)=>{
            weeklyCalendarInfos.forEach((item)=>{
                if(item.load && item.date === date) nextWeekLoadArray.push(item.load.value);
            })
            weeklyCalendarInfos.forEach((item)=>{
                if(item.load && item.date === date) nextWeekLoadInfoArray.push(item.load.value);
            })
        })
        setCurrentWeekLoads(currentWeekLoadArray);
        setNextWeekLoads(nextWeekLoadArray);
        setCurrentWeekLoadInfo(currentWeekLoadInfoArray);
        setNextWeekLoadInfo(nextWeekLoadInfoArray);
    }, [weeklyCalendarInfos])

    useEffect(()=>{
        let temp_currentWeekInfo = [];
        currentWeekDates.map((item=>{
            let dateInfo = [];
            dateInfo.date = item;
            dateInfo.info = weeklyCalendarInfos.filter((info)=>info.date === item);
            dateInfo.info.map((item)=>{
                item.editLoad = false;
            })
            temp_currentWeekInfo.push(dateInfo);
        }))
        setCurrentWeekTruckLoadData(temp_currentWeekInfo);

        let temp_nextWeekInfo = [];
        nextWeekDates.map((item=>{
            let dateInfo = [];
            dateInfo.date = item;
            dateInfo.info = weeklyCalendarInfos.filter((info)=>info.date === item);
            dateInfo.info.map((item)=>{
                item.editLoad = false;
            })
            temp_nextWeekInfo.push(dateInfo);
        }))
        setNextWeekTruckLoadData(temp_nextWeekInfo);
    },[weeklyCalendarInfos])

    const editText = (id) =>{
        dispatch({ type: "EDIT_COLORADONOTEPAD_MODAL", payload: { open: true, id } });
    }

    const deleteText = (id) =>{
        const text = "Are you sure to delete it?";
        if(confirm(text)) {
            dispatch(DeleteCalendarTextColoradoCalendar(id, token));
        }
    }

    const addRow = (date) => {
        dispatch(AddRowToColoradoCalendar(date, token));
    }

    const loadDispatch = (id, rowInfo) => {
        let tempTrucks = rowInfo.trucks;
        let tempLoad = rowInfo.load;
        if( tempTrucks?.length === 0 || !tempLoad  ) ToastHandler({status: null, msg: "Load or Truck isn't ready!"});
        else {
            tempTrucks.forEach((item)=>{
                item.status = "dispatched";
            })
            if(tempLoad) tempLoad.status = "dispatched"
            dispatch(LoadDispatchColoradoCalendar(tempTrucks, tempLoad, id, token));
        }
    }

    const unDispatch = (id, rowInfo) => {
        let tempTrucks = rowInfo.trucks;
        let tempLoad = rowInfo.load;
        if( tempTrucks?.length === 0 || !tempLoad  ) ToastHandler({status: null, msg: "Load or Truck isn't ready!"});
        else {
            tempTrucks.forEach((item)=>{
                item.status = "created";
            })
            if(tempLoad) tempLoad.status = "created"
            dispatch(UnDispatchColoradoCalendar(tempTrucks, tempLoad, id, token));
        }
    }

    const deleteTrucksInfo = (data, trucks, id) => {
        let changedTrucks = [];
        trucks.map((item)=>{
            if(item !== data) changedTrucks.push(item);
        })
        const text = "Are you sure to delete it?";
        if(confirm(text)) {
            dispatch(DeleteTrucksInfoColoradoCalendar(changedTrucks, data.value , id, token));
        }
    }

    const deleteLoadInfo = (id) => {
        const text = "Are you sure to delete it?";
        if(confirm(text)) {
            dispatch(DeleteLoadInfoColoradoCalendar(id, token));
        }
    }

    const deleteLoadAddInfo = (id) => {
        const text = "Are you sure to delete it?";
        if(confirm(text)) {
            dispatch(DeleteLoadAddInfoColoradoCalendar(id, token));
        }
    }

    const deleteRow = (id) => {
        const text = "Are you sure to delete it?";
        if(confirm(text)) {
            dispatch(DeleteRowColoradoCalendar(id, token));
        }
    }

    const loadEditHandle = (inputedLoad ,id) =>{
        setEditedLoad(inputedLoad);
        let tempCurrentWeekInfos = currentWeekTruckLoadData;
        tempCurrentWeekInfos.map((dayInfos)=>{
            dayInfos.info.forEach((item)=>{
                if(item._id === id) item.editLoad = !item.editLoad;
            })
        });
        setCurrentWeekTruckLoadData(tempCurrentWeekInfos);

        let tempNextWeekInfos = nextWeekTruckLoadData;
        tempNextWeekInfos.map((dayInfos)=>{
            dayInfos.info.forEach((item)=>{
                if(item._id === id) item.editLoad = !item.editLoad;
            })
        });
        setNextWeekTruckLoadData(tempNextWeekInfos);

        setAutoSelectFlag(!autoSelectFlag);
    }

    const allowDrop = (ev) => {
        ev.preventDefault();
    }

    const drag = (ev, dragItem, dragId) => {
        setDragItem(dragItem);
        setDragId(dragId);
        ev.dataTransfer.setData("text", ev.target.id);
    };

    const drop = (ev, dropId) => {
        ev.preventDefault();
        if (dragId !== "" && dragItem !== "" && dropId !== "" && dragId !== dropId) {
            let dragTrucks = [];
            let dropTrucks;
            weeklyCalendarInfos.forEach((info)=>{
                if(info._id === dragId) {
                    info.trucks.forEach((item)=>{
                        if(item !== dragItem) dragTrucks.push(item);
                    })
                }
                if(info._id === dropId) {
                    dropTrucks = info.trucks;
                    dropTrucks.push(dragItem);
                }
            })
            dispatch(DragAndDropColoradoCalendar(dragTrucks, dragId, dropTrucks, dropId, dragItem.value, token));
        }
    };

    const onChangeLoadHandle = (id, judgeWeek) => {
        if(!editedLoad || editedLoad.value === '' ) ToastHandler({status: null, msg: 'Please complete load!'})
        else{
            if(judgeWeek === "current") {
                const judge = currentWeekLoads.indexOf(editedLoad.value);
                if( judge < 0 ) {
                    if(loadInfo){
                        let tempLoad = editedLoad;
                        tempLoad.info = loadInfo;
                        dispatch(UpdateLoadColoradoCalendar(tempLoad, 'current', id, token));
                    } else dispatch(UpdateLoadColoradoCalendar(editedLoad, 'current', id, token));
                    setLoadInfo('');
                } else {
                    if(loadInfo || editedLoad.info) {
                        if(!loadInfo && !editedLoad.info)  ToastHandler({status: null, msg: 'The load already exist!'});
                        else{
                            if(!loadInfo && editedLoad.info) {
                                if(blank) {
                                    dispatch(AddLoadInfoColoradoCalendar(loadInfo, id, token));
                                    setLoadInfo('');
                                }
                                else ToastHandler({status: null, msg: 'The load already exist!'});
                                setBlank(false);
                            }
                            else if(loadInfo && !editedLoad.info) {
                                if(editedLoad.info === '') {
                                    dispatch(AddLoadInfoColoradoCalendar(loadInfo, id, token));
                                }
                                else ToastHandler({status: null, msg: 'The load already exist!'});
                            }
                            else if(loadInfo && editedLoad.info) {
                                let judge = currentWeekLoadInfo.find(item=> item === loadInfo);
                                if(judge){
                                    ToastHandler({status: null, msg: 'The load already exist!'});
                                    setLoadInfo('');
                                }else {
                                    dispatch(AddLoadInfoColoradoCalendar(loadInfo, id, token));
                                    setLoadInfo('');
                                }
                            }
                            else ToastHandler({status: null, msg: 'The load already exist!'});
                        }
                    }
                    else ToastHandler({status: null, msg: 'The load already exist!'});
                }
            } else {
                const judge = nextWeekLoads.indexOf(editedLoad.value);
                if( judge < 0 ) {
                    if(loadInfo){
                        let tempLoad = editedLoad;
                        tempLoad.info = loadInfo;
                        dispatch(UpdateLoadColoradoCalendar(tempLoad, 'next', id, token));
                    } else dispatch(UpdateLoadColoradoCalendar(editedLoad, 'next', id, token));
                    setLoadInfo('');
                } else {
                    if(loadInfo || editedLoad.info) {
                        if(!loadInfo && !editedLoad.info)  ToastHandler({status: null, msg: 'The load already exist!'});
                        else{
                            if(!loadInfo && editedLoad.info) {
                                if(blank) {
                                    dispatch(AddLoadInfoColoradoCalendar(loadInfo, id, token));
                                    setLoadInfo('');
                                }
                                else ToastHandler({status: null, msg: 'The load already exist!'});
                                setBlank(false);
                            }
                            else if(loadInfo && !editedLoad.info) {
                                if(editedLoad.info === '') {
                                    dispatch(AddLoadInfoColoradoCalendar(loadInfo, id, token));
                                }
                                else ToastHandler({status: null, msg: 'The load already exist!'});
                            }
                            else if(loadInfo && editedLoad.info) {
                                let judge = nextWeekLoadInfo.find(item=> item === loadInfo);
                                if(judge){
                                    ToastHandler({status: null, msg: 'The load already exist!'});
                                    setLoadInfo('');
                                }else{
                                    dispatch(AddLoadInfoColoradoCalendar(loadInfo, id, token));
                                    setLoadInfo('');
                                }
                            }
                            else ToastHandler({status: null, msg: 'The load already exist!'});
                        }
                    }
                    else ToastHandler({status: null, msg: 'The load already exist!'});
                }
            }
        }
    }

    const onInputLoadHandle = (changedValue) => {
        if(changedValue !== ""){
            if(editedLoad){
                let tempLoad = {"value": editedLoad.value, "status": editedLoad.status, "info": editedLoad.info};
                tempLoad.value = changedValue;
                setEditedLoad(tempLoad);
            } else{
                let tempLoad = { value: changedValue };
                tempLoad.status = "created";
                tempLoad.info = "";
                setEditedLoad(tempLoad);
            }
        } else {
            if(editedLoad){
                let tempLoad = {"value": editedLoad.value, "status": editedLoad.status, "info": editedLoad.info};
                tempLoad.value = changedValue;
                setEditedLoad(tempLoad);
            } else{
                let tempLoad = { value: changedValue };
                tempLoad.status = "created";
                setEditedLoad(tempLoad);
            }
            ToastHandler({status: null, msg: 'Please complete load!'})
        }
    }

    const setLoadInfoHandle = (data) => {
        setLoadInfo(data);
        if(data === "") setBlank(true);
        else setBlank(false);
    }

    return (
        <div className="calendarTableField">
            <div className="datatableTitle">
                Colorado Calendar
            </div>
            <TableContainer className="tableField">
                <div>
                    <Table aria-label="simple table" className="calendarTable">
                        <TableBody>
                            {
                                currentWeekTruckLoadData.map((items, index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            <TableRow>
                                                <TableCell className="dateCell" rowSpan={items.info.length+2}>
                                                    {items.date.slice(0,-5)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="headerRow">
                                                {
                                                    headerArray.map((item, index)=>{
                                                        if(item === "ID"){
                                                            return (
                                                                <TableCell key={index} className="headerCells idHeaderCell">{item}</TableCell>
                                                            )
                                                        } else if(item === "Truck") {
                                                            return (
                                                                <TableCell key={index} className="headerCells truckHeaderCell">
                                                                    {item}
                                                                    <Tooltip title="Add row">
                                                                        <AddCircleOutlineIcon
                                                                            className="headerButton"
                                                                            onClick={(e)=>addRow(items.date)}
                                                                           
                                                                        />
                                                                    </Tooltip>
                                                                </TableCell>
                                                            )
                                                        } else {
                                                            return (
                                                                <TableCell key={index} className="headerCells loadHeaderCell">
                                                                    {item}
                                                                    <Tooltip title="Add row">
                                                                        <AddCircleOutlineIcon
                                                                            className="headerButton"
                                                                            onClick={(e)=>addRow(items.date)}
                                                                        />
                                                                    </Tooltip>
                                                                </TableCell>
                                                            )
                                                        }
                                                    })
                                                }
                                            </TableRow>
                                            {items.info.map((item, key) => {
                                                return (
                                                    <TableRow key={key}>
                                                        <TableCell className="numCell">{key + 1}</TableCell>
                                                        <TableCell className="truckCell">
                                                            <CalendarTruck
                                                                turn={index}
                                                                index={key}
                                                                dispatched = {item.dispatched}
                                                                drag={(ev, item, id)=>drag(ev, item, id)}
                                                                drop={(ev, id)=>drop(ev, id)}
                                                                id={item._id}
                                                                ondragover={allowDrop}
                                                                items={item.trucks}
                                                                weekHandle={'current'}
                                                                onClickHandle={(data)=>deleteTrucksInfo(data, item.trucks, item._id)}
                                                            ></CalendarTruck>
                                                        </TableCell>
                                                        <TableCell className="loadCell"  onDoubleClick={(e)=>loadEditHandle(item.load, item._id)}>
                                                            {item.editLoad && 
                                                                <>
                                                                    <input placeholder="Input load" className="loadInput" defaultValue={editedLoad?.value} onChange={(e)=>onInputLoadHandle(e.target.value)} />
                                                                    <input placeholder="Add info" className="loadInput" defaultValue={editedLoad?.info} onChange={(e)=>setLoadInfoHandle(e.target.value)} />
                                                                    <button className="loadButton" onClick={(e)=>onChangeLoadHandle(item._id, "current")}>OK</button>
                                                                </>
                                                            }
                                                            {!item.editLoad &&
                                                                <>
                                                                    {item.load && 
                                                                        <>
                                                                            <div className={"card " + item.load.status}>
                                                                                <div className="loadChip">
                                                                                    {item.load.duplicated && <Duplicated />}
                                                                                    <p className="cardText">{item.load.value}</p>
                                                                                </div>
                                                                                <ChipColorSelectButton type={'load'} id={item._id} load={item.load} />
                                                                                <DeleteInfoButton onClickHandle={(e)=>deleteLoadInfo(item._id)} />
                                                                            </div>
                                                                            {item.load.info && 
                                                                                <div className={"card " + item.load.status}>
                                                                                    <div>
                                                                                        <p className="cardText">{item.load.info}</p>
                                                                                    </div>
                                                                                    <DeleteInfoButton onClickHandle={(e)=>deleteLoadAddInfo(item._id)} />
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    }
                                                                    <div className="buttonField">
                                                                        {!item.dispatched && <LoadDispatchButton onClickHandle={(e)=>loadDispatch(item._id, item)} />}
                                                                        {item.dispatched && <UnDispatchButton onClickHandle={(e)=>unDispatch(item._id, item)} />}
                                                                        <DeleteRowButton onClickHandle={()=>deleteRow(item._id)} />
                                                                    </div>
                                                                </>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <Table aria-label="simple table" className="calendarTable" sx={{marginLeft: "15px"}}>
                        <TableBody>
                            {
                                nextWeekTruckLoadData.map((items, index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            <TableRow>
                                                <TableCell className="dateCell" rowSpan={items.info.length+2}>
                                                    {items.date.slice(0,-5)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="headerRow">
                                                {
                                                    headerArray.map((item, index)=>{
                                                        if(item === "ID"){
                                                            return (
                                                                <TableCell key={index} className="headerCells idHeaderCell">{item}</TableCell>
                                                            )
                                                        } else if(item === "Truck") {
                                                            return (
                                                                <TableCell key={index} className="headerCells truckHeaderCell">
                                                                    {item}
                                                                    <Tooltip title="Add row">
                                                                        <AddCircleOutlineIcon
                                                                            className="headerButton"
                                                                            onClick={(e)=>addRow(items.date)}
                                                                        />
                                                                    </Tooltip>
                                                                </TableCell>
                                                            )
                                                        } else {
                                                            return (
                                                                <TableCell key={index} className="headerCells loadHeaderCell">
                                                                    {item}
                                                                    <Tooltip title="Add row">
                                                                        <AddCircleOutlineIcon
                                                                            className="headerButton"
                                                                            onClick={(e)=>addRow(items.date)}
                                                                        />
                                                                    </Tooltip>
                                                                </TableCell>
                                                            )
                                                        }
                                                    })
                                                }
                                            </TableRow>
                                            {items.info.map((item, key) => {
                                                return (
                                                    <TableRow key={key}>
                                                        <TableCell className="numCell">{key + 1}</TableCell>
                                                        <TableCell className="truckCell">
                                                            <CalendarTruck
                                                                turn={index}
                                                                index={key}
                                                                dispatched = {item.dispatched}
                                                                drag={(ev, item, id)=>drag(ev, item, id)}
                                                                drop={(ev, id)=>drop(ev, id)}
                                                                id={item._id}
                                                                ondragover={allowDrop}
                                                                items={item.trucks}
                                                                weekHandle={'next'}
                                                                onClickHandle={(data)=>deleteTrucksInfo(data, item.trucks, item._id)}
                                                            ></CalendarTruck>
                                                        </TableCell>
                                                        <TableCell className="loadCell"  onDoubleClick={(e)=>loadEditHandle(item.load, item._id)}>
                                                            {item.editLoad && 
                                                                <>
                                                                    <input placeholder="Input load" className="loadInput" defaultValue={editedLoad?.value} onChange={(e)=>onInputLoadHandle(e.target.value)} />
                                                                    <input placeholder="Add info" className="loadInput" defaultValue={editedLoad?.info} onChange={(e)=>setLoadInfoHandle(e.target.value)} />
                                                                    <button className="loadButton" onClick={(e)=>onChangeLoadHandle(item._id, "next")}>OK</button>
                                                                </> 
                                                            }
                                                            {!item.editLoad &&
                                                                <>
                                                                    {item.load &&
                                                                        <> 
                                                                            <div className={"card " + item.load.status}>
                                                                                <div className="loadChip">
                                                                                    {item.load.duplicated && <Duplicated />}
                                                                                    <p className="cardText">{item.load.value}</p>
                                                                                </div>
                                                                                <ChipColorSelectButton type={'load'} id={item._id} load={item.load} />
                                                                                <DeleteInfoButton onClickHandle={(e)=>deleteLoadInfo(item._id)} />
                                                                            </div>
                                                                            {item.load.info && 
                                                                                <div className={"card " + item.load.status}>
                                                                                    <div>
                                                                                        <p className="cardText">{item.load.info}</p>
                                                                                    </div>
                                                                                    <DeleteInfoButton onClickHandle={(e)=>deleteLoadAddInfo(item._id)} />
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    }
                                                                    <div className="buttonField">
                                                                        {!item.dispatched && <LoadDispatchButton onClickHandle={(e)=>loadDispatch(item._id, item)} />}
                                                                        {item.dispatched && <UnDispatchButton onClickHandle={(e)=>unDispatch(item._id, item)} />}
                                                                        <DeleteRowButton onClickHandle={()=>deleteRow(item._id)} />
                                                                    </div>
                                                                </>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <div className="calendarText">
                        <ColoradoNoteDialog />
                        <div className="calendarTextTitle">
                            <h3 className="notePadTitle">NotePad</h3>
                            <ColoradoNoteAddDialog />
                        </div>
                        <DataGrid
                            className="datagrid calendarDataGrid"
                            density="compact"
                            rows={calendarTexts.filter(
                                (illinois) =>
                                (illinois.id = calendarTexts.indexOf(illinois) + 1)
                            )}
                            columns={coloradoTextColumns.concat(actionColumn)}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            getRowId={(row) => calendarTexts.indexOf(row)}
                            //checkboxSelection
                            autoHeight
                            getRowClassName={(params) => `row-${params.row.id}`}
                        />
                    </div>
                </div>
            </TableContainer>
        </div>
    );
};

export default ColoradoWeeklyCalendar;