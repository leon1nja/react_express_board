import "./setting.scss";
import AdminNavbar from "../../components/navbar/AdminNavbar";

import SettingList from "../../components/datatable/SettingList";

const Setting = ({ inputs, title }) => {
  return (
    <div className="setting">
      <AdminNavbar />
      <div className="newContainer">
        <SettingList />
      </div>
    </div>
  );
};

export default Setting;
