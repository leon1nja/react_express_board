import "./trucklist.scss"
import AdminNavbar from "../../components/navbar/AdminNavbar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MuiDataGrid from "../../components/datatable/UtahCalendar"

const Calendar = () => {
  const dispatch = useDispatch()
 
  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        <AdminNavbar />
        <div className="tablesContainer flexcolumn">
         <MuiDataGrid />
          
        </div>
      </div>
    </div>
  )
}

export default Calendar