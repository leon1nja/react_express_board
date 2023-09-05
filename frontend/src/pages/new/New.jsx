import "./new.scss";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetUsers, UserRegAction } from "../../redux/actions/AuthActions";
import { TextField, FormControl, InputLabel, Select, MenuItem, Paper, Button } from "@mui/material";
import UserList from "./UserList";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from "react";
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [state, setState] = useState({ name: "", email: "", password: "", role: "user" })
  const OnChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const dispatch = useDispatch()
  const OnSubmitHandler = async (e) => {
    e.preventDefault()
    if (!file) {
      return alert("Please upload an Avatar")
    }
    var obj = { ...state, image: file }
    dispatch(UserRegAction(obj))

  }
  useEffect(() => {
    dispatch(GetUsers())
  }, [])
  return (
    <div className="new">
      <AdminNavbar />
      <Paper sx={{ width: "50%", padding: "50px", margin: "auto" }}>
        <div className="newContainer">

          <div className="bottom">

            <div className="right">
              {/* CREATE USER FORM */}
              <form>
                <h3 className="loginFormTitle">
                  Create New User
                </h3>

                {inputs.map((input) => (
                  <TextField fullWidth key={input.id} label={input.label} type={input.type} onChange={OnChangeHandler} placeholder={input.placeholder} name={input.name} />
                ))}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" placeholder="User Role">User Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.role}
                    label="User Role"
                    onChange={(e) => setState({ ...state, role: e.target.value })}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="superadmin">Super Admin</MenuItem>


                  </Select>
                </FormControl>
                <div className="formInput" >
                  <label style={{ cursor: "pointer" }} onChange={(e) => setFile(e.target.files[0])} htmlFor="formId">
                    Upload Avatar
                    <input name="" type="file" id="formId" hidden />
                    <CloudUploadIcon fontSize='large' color="secondary" />
                  </label>

                </div>
                <Button onClick={OnSubmitHandler}>Create User</Button>

              </form>
            </div>
          </div>

          {/* USER LISTS COMPONENT*/}
          <UserList />
        </div>
      </Paper>
    </div>
  );
};

export default New;
