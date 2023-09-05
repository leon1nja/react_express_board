import "./login.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogAction } from "../../redux/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";



const Login = ({ inputs, title }) => {
  const [state, setState] = useState({ email: "", password: "" });
  const OnChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { LogStatus } = useSelector((state) => state.UserReg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(UserLogAction(state));
  };
  useEffect(() => {
    if (LogStatus) {
      navigate("/");
    }
  }, [LogStatus]);

  const theme = createTheme();

  const pressEnter = (e) => {
      if(e.key === "Enter") OnSubmitHandler();
  };

  return (
    <div className="logins">
      <ThemeProvider theme={theme}>
        <Grid container component="main"  sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(./truck.png)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "right",
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ mt: 5, mb: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={OnSubmitHandler}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={OnChangeHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={OnChangeHandler}
                  onKeyDown={pressEnter}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2,pt: 1, fontSize: 18 }}
                >
                  Sign In
                </Button>
                {/* <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid> */}
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Login;
