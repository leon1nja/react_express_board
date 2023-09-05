import "./midwestEastDataTable.scss";
import MidwestWeeklyCalendar from "../MidwestCalendar";
import EastWeeklyCalendar from "../EastCalendar";

const UtahDatatable = () => {
  return (
    <>
      <div className="midwestField">
        <div className="trucktable">
          <div className="calendarField">
            <MidwestWeeklyCalendar />
          </div>
        </div>
        <div className="trucktable">
          <div className="calendarField">
            <EastWeeklyCalendar />
          </div>
        </div>
      </div>
    </>

  );
};

export default UtahDatatable;
