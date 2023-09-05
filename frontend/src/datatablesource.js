import moment from "moment"
import { Link } from "react-router-dom";
import { changeDateTimeType } from "./functionLib";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import { fontSize } from "@mui/system";

export const truckColumns = [
  {
    field: "truck_num",
    headerName: "Truck #",
    headerClassName:"header",
    width: 100,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
    renderCell: (params) => {
      return <div style={{fontWeight:"900", marginLeft:'15px'}} className={`rowitem ${params.row.day.toLowerCase() === "monday" ? "monday" : (params.row.day.toLowerCase() === "tuesday" ? "tuesday" : (params.row.day.toLowerCase() === "wednesday" ? "wednesday" : (params.row.day.toLowerCase() === "thursday" ? "thursday" : (params.row.day.toLowerCase() === "friday" ? "friday" : (params.row.day.toLowerCase() === "saturday" ? "saturday" : (params.row.day.toLowerCase() === "sunday" ? "sunday" : ""))))))} `} >{params.row.truck_num}</div>;
    }
  },
  {
    field: "city",
    headerName: "City",
    headerClassName:"header",
    width: 120,
    renderCell: (params) => {
      return <div style={{fontWeight:"900"}} className={`rowitem ${params.row.day.toLowerCase() === "monday" ? "monday" : (params.row.day.toLowerCase() === "tuesday" ? "tuesday" : (params.row.day.toLowerCase() === "wednesday" ? "wednesday" : (params.row.day.toLowerCase() === "thursday" ? "thursday" : (params.row.day.toLowerCase() === "friday" ? "friday" : (params.row.day.toLowerCase() === "saturday" ? "saturday" : (params.row.day.toLowerCase() === "sunday" ? "sunday" : ""))))))} `} >{params.row.city}</div>;
    }
  },

  {
    field: "state",
    headerName: "State",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div style={{fontWeight:"900"}} className={`rowitem ${params.row.day.toLowerCase() === "monday" ? "monday" : (params.row.day.toLowerCase() === "tuesday" ? "tuesday" : (params.row.day.toLowerCase() === "wednesday" ? "wednesday" : (params.row.day.toLowerCase() === "thursday" ? "thursday" : (params.row.day.toLowerCase() === "friday" ? "friday" : (params.row.day.toLowerCase() === "saturday" ? "saturday" : (params.row.day.toLowerCase() === "sunday" ? "sunday" : ""))))))} `} >{params.row.state}</div>;
    }
  },
  {
    field: "daySort",
    headerName: "Day",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div style={{fontWeight:"900"}} className={`rowitem ${params.row.day.toLowerCase() === "monday" ? "monday" : (params.row.day.toLowerCase() === "tuesday" ? "tuesday" : (params.row.day.toLowerCase() === "wednesday" ? "wednesday" : (params.row.day.toLowerCase() === "thursday" ? "thursday" : (params.row.day.toLowerCase() === "friday" ? "friday" : (params.row.day.toLowerCase() === "saturday" ? "saturday" : (params.row.day.toLowerCase() === "sunday" ? "sunday" : ""))))))} `} >{params.row.day}</div>;
    },
    // sortComparator: (v1, v2) => v1.name.localeCompare(v2.name)
  },
  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 400,
    renderCell: (params) => {
      return <div style={{fontWeight:"900", color: "red"}} className="rowitem">{params.row.notes}</div>;
    },
  },
  {
    field: "request",
    headerName: "Request",
    headerClassName:"header",
    width: 70,
    renderCell: (params) => {
      const { token } = useSelector(state => state.UserReg);
      const dispatch = useDispatch();
      const selectTruck = (truck) =>{
        dispatch({ type: "MATCH_REQUEST", payload: { truck } })
      }
      return <Link to={params.row.request==="Match"? "/request" : ""} style={{textDecoration:"none", fontWeight:"900" }}><div  className={`rowitem ${params.row.day.toLowerCase() === "monday" ? "monday" : (params.row.day.toLowerCase() === "tuesday" ? "tuesday" : (params.row.day.toLowerCase() === "wednesday" ? "wednesday" : (params.row.day.toLowerCase() === "thursday" ? "thursday" : (params.row.day.toLowerCase() === "friday" ? "friday" : (params.row.day.toLowerCase() === "saturday" ? "saturday" : (params.row.day.toLowerCase() === "sunday" ? "sunday" : ""))))))} `} onClick={(e)=>selectTruck(params.row.truck_num)} >{params.row.request}</div></Link>;
    }
  }
  // {
  //   field: "status",
  //   headerName: "Status",
  // headerClassName:"header",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
export const UserColumns=[
  { field: "id", headerName: "ID", width: 100 ,

  headerClassName:"header",
},
  { field: "name", headerName: "Name", width: 250 ,
  headerClassName:"header",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={process.env.REACT_APP_BACKEND_API + params.row.image} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
},
  { field: "email", headerName: "Email", width: 250 ,

  headerClassName:"header",
},
  { field: "role", headerName: "Role", width: 200 ,

  headerClassName:"header",
},

]

export const historyColumns = [
  { field: "id", headerName: "ID", width: 70 ,

  headerClassName:"header",
},
  {
    field: "name",
    headerName: "User",
    headerClassName:"header",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img className="cellImg" src={process.env.REACT_APP_BACKEND_API+ params.row.user.image} alt="avatar" /> */}
          {params.row.user.name}
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Dispatch Date",
    headerClassName:"header",
    width: 160,
    type: 'date',
    valueFormatter: params =>
      moment(params?.value).format("MMMM D, h:mm A"),

  },
  {
    field: "truck_num",
    headerName: "Truck #",
    headerClassName:"header",
    width: 80,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "bold" }}>{params.row.truck.truck_num}</div>;
    },

  },
  {
    field: "city",
    headerName: "City",
    headerClassName:"header",
    width: 120,
    renderCell: (params) => {
      return <div className="rowitem">{params.row.truck.city}</div>;
    },
  },

  {
    field: "state",
    headerName: "State",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem">{params.row.truck.state}</div>;
    },
  },
  {
    field: "day",
    headerName: "Day",
    headerClassName:"header",
    width: 120,
    renderCell: (params) => {
      return <div className="rowitem">{params.row.truck.day}</div>;
    },
  },
  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 200,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red" }}>{params.row.truck.notes}</div>;
    },
  },]


  export const settingTruckColumns = [
    { field: "id", headerName: "ID", width: 70,
  
    headerClassName:"header",
  },
    {
      field: "number",
      headerName: "Truck #",
      headerClassName:"header",
      width: 150,
      renderCell: (params) => {
        return <div className="rowitem" >{params.row.name}</div>;
      },
    },
  ];
  export const settingTrailerColumns = [
    { field: "id", headerName: "ID", width: 70 ,
  
    headerClassName:"header",
  },
    {
      field: "number",
      headerName: "Trailer #",
      headerClassName:"header",
      width: 150,
      renderCell: (params) => {
        return <div className="rowitem" >{params.row.name}</div>;
      },
    },
  ]; 
  export const settingLocationColumns = [
    { field: "id", headerName: "ID", width: 70 ,
  
  
    headerClassName:"header",
  },
    {
      field: "location",
      headerName: "Location",
      headerClassName:"header",
      width: 150,
      renderCell: (params) => {
        return <div className="rowitem" >{params.row.location}</div>;
      },
    },
  ];
  export const settingVendorColumns = [
    { field: "id", headerName: "ID", width: 50 ,
  
  
    headerClassName:"header",
  },
    {
      field: "name",
      headerName: "Vendor",
      headerClassName:"header",
      width: 90,
      renderCell: (params) => {
        return <div className="rowitem" >{params.row.name}</div>;
      },
    },
    {
      field: "color",
      headerName: "Color",
      headerClassName:"header",
      width: 90,
      renderCell: (params) => {
        return <div className="rowitem" style={{ color: params.row.color }}>{params.row.color}</div>;
      },
    },
  ];
export const requestColumns = [
  { field: "id", headerName: "ID", 
    width: 30 ,
    headerClassName:"header",
},
  {
    field: "truck_num",
    headerName: "Truck #",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "bold", color: params.row.color }}>{params.row.truck_num}</div>;
    },
  },
  {
    field: "location",
    headerName: "Location",
    headerClassName:"header",
    width: 150,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: params.row.color }}>{params.row.location}</div>;
    },
  },

  {
    field: "date",
    headerName: "Date",
    headerClassName:"header",
    width: 150,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: params.row.color }}>{params.row.date}</div>;
    },

  },
  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 250,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red" }}>{params.row.notes}</div>;
    },
  },
];
export const illusionColumns = [
  { field: "id", headerName: "ID", width: 70 ,

  headerClassName:"header",
},
  { field: "trailer", 
  headerName: "Trailer",
  headerClassName:"header", 
  width: 100 ,
  renderCell: (params) => {
    
    return <div className="rowitem" style={{ fontWeight: "900" }}>{params.row.trailer}</div>;
  },}, 
  {
    field: "location",
    headerName: "Location",
    headerClassName:"header",
    width: 100,
    valueFormatter: ({ value }) => value.name ,
    valueGetter: ({ value }) => value.name ,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: params.row.location.color, fontWeight: "900"}}>{params.row.location.name}</div>;
    },
  },
  
  {
    field: "truck_num",
    headerName: "Truck",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "900" }}>{params.row.truck_num }</div>;
    }
  },


  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 200,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red"}}>{params.row.notes}</div>;
    },
  },]
export const illusionColumns2 = [

  { field: "id", 
  headerName: "ID", 
  width: 30 ,
  headerClassName:"header",
},
  { field: "truck_num", 
    headerName: "Truck", 
    width: 60 ,
    headerClassName:"header",
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "900" }}>{params.row.truck_num }</div>;
    }
},

  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 160,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red" }}>{params.row.notes}</div>;
    },
  }
]

export const dedicatedColumns = [
  { field: "location", headerName: "Location", width: 135 , cellClassName:"locationCell",
  renderCell: (params) => {
    return <div className="rowitem" style={{ fontWeight: "900"}}>{params.row.location}</div>;
  }
},
  {
    field: "monday",
    headerName: "Monday",
    width: 120,
    headerAlign:"center",
    cellClassName:"cell",
    renderCell: (params) => {
      return <div  className={ `rowitem  ${params.row.monday.font === "bold" ? "blueBorderRight" : ""}`} style={{fontWeight:params.row.monday.font,color:params.row.monday.textColor, backgroundColor: params.row.monday.color,textAlign:'center',width:'100%',height:"90%" ,display:"flex",justifyContent:'center',alignItems:'center',margin:"auto"}}>{params.row.monday.truck}</div>;
    },
  },
  {
    field: "tuesday",
    headerName: "Tuesday",
    width: 120,
    headerAlign:"center",
    cellClassName:"cell",

    renderCell: (params) => {
      return <div className={ `rowitem  ${params.row.tuesday.font === "bold" ? "blueBorderRight" : ""}`} style={{fontWeight:params.row.tuesday.font,color:params.row.tuesday.textColor, backgroundColor: params.row.tuesday.color ,textAlign:'center',width:'100%',height:"90%" ,display:"flex",justifyContent:'center',alignItems:'center',margin:"auto"}}>{params.row.tuesday.truck}</div>;
    },
  },

  {
    field: "wednesday",
    headerName: "Wednesday",
    width: 120,
    headerAlign:"center",
    cellClassName:"cell",

    renderCell: (params) => {
      return <div className={ `rowitem  ${params.row.wednesday.font === "bold" ? "blueBorderRight" : ""}`} style={{fontWeight:params.row.wednesday.font,color:params.row.wednesday.textColor, backgroundColor: params.row.wednesday.color ,textAlign:'center',width:'100%',height:"90%" ,display:"flex",justifyContent:'center',alignItems:'center',margin:"auto"}}>{params.row.wednesday.truck}</div>;
    },
  },
  {
    field: "thursday",
    headerName: "Thursday",
    width: 120,
    headerAlign: 'center',
    cellClassName:"cell",

    renderCell: (params) => {
      return <div className={ `rowitem  ${params.row.thursday.font === "bold" ? "blueBorderRight" : ""}`} style={{fontWeight:params.row.thursday.font,color:params.row.thursday.textColor, backgroundColor: params.row.thursday.color ,textAlign:'center',width:'100%',height:"90%" ,display:"flex",justifyContent:'center',alignItems:'center',margin:"auto"}}>{params.row.thursday.truck}</div>;
    },
  },
  {
    field: "friday",
    headerName: "Friday",
    width: 120,
    headerAlign: 'center',
    cellClassName:"cell",

    renderCell: (params) => {
      return <div className={ `rowitem  ${params.row.friday.font === "bold" ? "blueBorderRight" : ""}`} style={{fontWeight:params.row.friday.font,color:params.row.friday.textColor, backgroundColor: params.row.friday.color ,textAlign:'center',width:'100%',height:"90%" ,display:"flex",justifyContent:'center',alignItems:'center',margin:"auto"}}>{params.row.friday.truck}</div>;
    },
  },
];

export const utahColumns = [
  { field: "id", headerName: "ID", width: 30 ,

  headerClassName:"header",
},
  {
    field: "trailer",
    headerName: "Trailer #",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "900"}}>{params.row.trailer}</div>;
    }
  },
  {
    field: "empty",
    headerName: "Empty",
    headerClassName:"header",
    width: 70,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red", fontWeight: "900"}}>{params.row.empty}</div>;
    }
  },

  {
    field: "vendor",
    headerName: "Location",
    headerClassName:"header",
    width: 100,
    valueFormatter: ({ value }) => value.name ,
    valueGetter: ({ value }) => value.name ,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: params.row.vendor.color, fontWeight: "900"}}>{params.row.vendor.name}</div>;
    },
  },
  {
    field: "truck_num",
    headerName: "Truck",
    headerClassName:"header",
    width: 50,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "900" }}>{params.row.truck_num }</div>;
    }
  },
  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 250,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red", fontWeight: "bold" }}>{params.row.notes}</div>;
    },
  },
];

export const coloradoColumns = [
  { field: "id", headerName: "ID", width: 30 ,

  headerClassName:"header",
},
  {
    field: "trailer",
    headerName: "Trailer #",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "900"}}>{params.row.trailer}</div>;
    }
  },

  {
    field: "empty",
    headerName: "Empty",
  headerClassName:"header",
    width: 70,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red"}}>{params.row.empty}</div>;
    }
  },
  {
    field: "location",
    headerName: "Location",
    headerClassName:"header",
    width: 100,
    valueFormatter: ({ value }) => value.name ,
    valueGetter: ({ value }) => value.name ,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: params.row.location.color, fontWeight: "900" }}>{params.row.location.name}</div>;
    },
  },
  {
    field: "truck_num",
    headerName: "Truck",
    headerClassName:"header",
    width: 50,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "900" }}>{params.row.truck_num }</div>;
    }
  },
  


  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 250,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red" }}>{params.row.notes}</div>;
    },
  },
];
export const midwestColumns = [
  { field: "id", headerName: "ID", width: 70,
  headerClassName:"header",
 },
  {
    field: "trailer",
    headerName: "Trailer #",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "900"}}>{params.row.trailer}</div>;
    }
  },
  {
    field: "location",
    headerName: "Location",
    headerClassName:"header",
    width: 100,
    valueFormatter: ({ value }) => value.name ,
    valueGetter: ({ value }) => value.name ,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: params.row.location.color, fontWeight: "900"}}>{params.row.location.name}</div>;
    },
  },
  {
    field: "truck_num",
    headerName: "by Truck",
    headerClassName:"header",
    width: 100,

  },
  {
    field: "notes",
    headerName: "Notes",
    headerClassName:"header",
    width: 200,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red" }}>{params.row.notes}</div>;
    },
  },
];

export const actionlogColumns = [
  { field: "board", headerName: "Board", width: 150,
    headerClassName:"header",
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "bold"}}>{params.row.board}</div>;
    }
  },
  {
    field: "createdAt",
    headerName: "Date & Time",
    headerClassName:"header",
    width: 200,
    renderCell: (params) => {
      return <div className="rowitem">{changeDateTimeType(params.row.createdAt)}</div>;
    }
  },
  {
    field: "user",
    headerName: "Username",
    headerClassName:"header",
    valueFormatter: ({ value }) => value.name,
    valueGetter: ({ value }) => value.name,
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "bold"}}>{params.row.user.name}</div>;
    },
  },
  {
    field: "column",
    headerName: "Column",
    headerClassName:"header",
    width: 100,
    renderCell: (params) => {
      return <div className="rowitem" style={{ fontWeight: "bold"}}>{params.row.column}</div>;
    },
  },
  {
    field: "title",
    headerName: "Action",
    headerClassName:"header",
    width: 700,
    renderCell: (params) => {
      return <div className="rowitem">{params.row.title}</div>;
    },
  },
  {
    field: "prevValue",
    headerName: "Prev Value",
    headerClassName:"header",
    width: 170,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "red" }}>{params.row.prevValue}</div>;
    },
  },
  {
    field: "newValue",
    headerName: "New Value",
    headerClassName:"header",
    width: 170,
    renderCell: (params) => {
      return <div className="rowitem" style={{ color: "green" }}>{params.row.newValue}</div>;
    },
  },
];

export const utahTextColumns = [
  { field: "id",
    headerName: "ID",
    width: 50 ,
    headerClassName:"header",
  },
  {
    field: "text",
    headerName: "Note",
    headerClassName:"header",
    width: 350,
    renderCell: (params) => {
      return (
        <Tooltip title={params.row.text} sx={{fontSize: "14px"}}>
          <div className="rowitem" style={{ color: "red" }}>{params.row.text}</div>
        </Tooltip>
      )
    }
  },
];

export const coloradoTextColumns = [
  { field: "id",
    headerName: "ID",
    width: 50 ,
    headerClassName:"header",
  },
  {
    field: "text",
    headerName: "Note",
    headerClassName:"header",
    width: 350,
    renderCell: (params) => {
      return (
        <Tooltip title={params.row.text} sx={{fontSize: "14px"}}>
          <div className="rowitem" style={{ color: "red" }}>{params.row.text}</div>
        </Tooltip>
      )
    }
  },
];

export const eastTextColumns = [
  { field: "id",
    headerName: "ID",
    width: 50 ,
    headerClassName:"header",
  },
  {
    field: "text",
    headerName: "Note",
    headerClassName:"header",
    width: 350,
    renderCell: (params) => {
      return (
        <Tooltip title={params.row.text} sx={{fontSize: "14px"}}>
          <div className="rowitem" style={{ color: "red" }}>{params.row.text}</div>
        </Tooltip>
      )
    }
  },
];

export const midwestTextColumns = [
  { field: "id",
    headerName: "ID",
    width: 50 ,
    headerClassName:"header",
  },
  {
    field: "text",
    headerName: "Note",
    headerClassName:"header",
    width: 350,
    renderCell: (params) => {
      return (
        <Tooltip title={params.row.text} sx={{fontSize: "14px"}}>
          <div className="rowitem" style={{ color: "red" }}>{params.row.text}</div>
        </Tooltip>
      )
    }
  },
];

//temporary data