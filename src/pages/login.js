import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  Snackbar,
  Backdrop,
  CircularProgress,
  Hidden,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Navigate, Link } from "react-router-dom";
import axios from "../config/axios";

import LandingLogin from "../assets/LandingLogin.jpeg";
import LogoG from "../assets/LogoG.webp";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({ password: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldValidationError, setfieldValidationError] = useState(false);

  useEffect(() => {
    if (email === "" || password === "") {
      setfieldValidationError(true);
    } else {
      setfieldValidationError(false);
    }
  }, [email, password]);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    setLoading(true);

    axios
      .post("/auth", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        setRedirect(true);
      })
      .catch((err) => {
        console.log("error => ", err);
        setOpen(true);
        setLoading(false);
      });
  };

  if (redirect) {
    return <Navigate to="/ShowUsers" />;
  }

  return (
    <div>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Grid
        container
        style={{
          minHeight: "90vh",
          justifyContent: "space-evenly",
        }}
      >
        <Hidden smDown>
          <Grid item style={{ textAlignLast: "center", alignSelf: "center" }}>
            <img
              src={LandingLogin}
              alt="landing"
              style={{ objectFit: "cover" }}
            />
          </Grid>
        </Hidden>
        <Grid
          container
          item
          alignItems="center"
          direction="column"
          style={{
            justifyContent: "center",
            placeContent: "center",
            width: "40vh",
          }}
        >
          <div />
          <form onSubmit={HandleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "300px",
                rowGap: "1rem",
              }}
            >
              <Grid container sx={{ padding: 10 }}>
                <img src={LogoG} alt="logo" width={200} />
              </Grid>
              <InputLabel variant="standard">Nombre de usuario</InputLabel>
              <Input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                name="email"
                required
                fullWidth
              />
              <InputLabel variant="standard">Contraseña</InputLabel>
              <Input
                name="password"
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={password}
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div style={{ height: 20 }} />
              <Grid
                container
                spacing={4}
                alignItems="stretch"
                direction="column"
                justifyContent="center"
              >
                <Grid
                  container
                  item
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    size="small"
                    disabled={fieldValidationError}
                  >
                    Entrar
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Link style={{ textDecoration: "none" }} to="/Register">
                    <Button variant="text">Registrate aqui</Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert severity="error">
              Nombre de usuario y/o Contraseña incorectos
            </Alert>
          </Snackbar>
        </Grid>
        <div />
      </Grid>
    </div>
  );
};

export default Login;
