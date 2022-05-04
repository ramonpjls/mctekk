import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Container,
} from "@mui/material";
import axios from "../config/axios";
import Swal from "sweetalert2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

import PasswordStrengthIndicator from "../utils/passwordStrengthIndicator";

const isNumberRegx = /\d/;
// eslint-disable-next-line
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const alphaExp = /[A-Z]*$/g;

const Register = () => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(true);
  const [buttonDis, setButtonDis] = useState(true);
  const [helperError, setHelperError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [defaultCompany, setDefaultCompany] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    mayusChar: null,
    specialChar: null,
  });

  const pageHeader = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
  };

  const clear = () => {
    localStorage.clear();
  };

  const onChangePassword = (password) => {
    setPassword(password);

    setPasswordValidity({
      mayusChar: alphaExp.test(password) ? true : false,
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false,
    });
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setError(false);
      setHelperError("");
      setButtonDis(false);
    } else {
      setButtonDis(true);
      setError(true);
      setHelperError("debe coincidir las contraseñas");
    }
  }, [confirmPassword, password]);

  // eslint-disable-next-line
  const data = {
    firstname: nameValue,
    lastname: lastNameValue,
    email: emailValue,
    password: password,
    verify_password: confirmPassword,
    default_company: defaultCompany,
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/users", data)
      .then((res) => {
        window.location.reload();
        Swal.fire({
          text: "Creado exitosamente",
          icon: "success",
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        Swal.fire({
          text: err?.message,
          icon: "error",
        });
        console.warn(err);
      });
  };

  return (
    <div>
      <Container className="header" style={pageHeader}>
        <Typography align="left" variant="h6">
          Registro de Usuarios
        </Typography>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button
            onClick={clear}
            variant="contained"
            endIcon={<ExitToAppIcon />}
          >
            Salir
          </Button>
        </Link>
      </Container>
      <form style={{ paddingTop: "1rem" }} onSubmit={HandleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
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
              <Grid item xs={4}>
                <InputLabel> Nombres </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Apellidos </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="Text"
                  value={lastNameValue}
                  onChange={(e) => setLastNameValue(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid item xs={8}>
                <InputLabel> Email </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="email"
                  size="small"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={8}>
                <InputLabel> Compañia </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="text"
                  value={defaultCompany}
                  onChange={(e) => setDefaultCompany(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Contraseña </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="Password"
                  value={password}
                  onChange={(e) => onChangePassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Confirme su contraseña </InputLabel>
                <TextField
                  error={error}
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  helperText={helperError}
                />
              </Grid>
              <Grid
                container
                item
                alignItems="center"
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  {passwordFocused && (
                    <PasswordStrengthIndicator validity={passwordValidity} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={buttonDis}
                >
                  Enviar solicitud
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Register;
