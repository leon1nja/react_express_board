import "./trucklist.scss"

import AdminNavbar from "../../components/navbar/AdminNavbar"
import CustomizedTimeline from "../../components/timeline/Timeline"
import { useEffect } from "react"
import { GetTrucksAction } from "../../redux/actions/TruckActions"
import { useDispatch, useSelector } from "react-redux"
import DailyTruckList from "../../components/datatable/DailyTrucklist"


const TruckList = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.UserReg)

  useEffect(() => {
    dispatch(GetTrucksAction(token))
  }, [])
  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        <AdminNavbar />
        <div className="tablesContainer ">
          <DailyTruckList />
          {/* <div className="timelineContainer">
          <h3 className="actionLogTitle" >Action Log</h3>

            <CustomizedTimeline />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default TruckList