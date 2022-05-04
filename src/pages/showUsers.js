import axios from "../config/axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const pageHeader = {
    backgroundColor: "#79A9D1",
    color: "white",
    borderRadius: "3px",
    padding: "10px",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
  };

  useEffect(() => {
    const userType = localStorage.getItem("token");

    if (!userType) {
      navigate("/Login");
    } // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <div>
      <Container className="header" style={pageHeader}>
        <Typography align="left" variant="h6">
          Control de Usuarios
        </Typography>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button variant="contained" endIcon={<ExitToAppIcon />}>
            Salir
          </Button>
        </Link>
      </Container>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nombre de Usuario</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.uuid}>
                <TableCell>
                  <Typography>{row.displayname}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.firstname}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.lastname}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.email}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
