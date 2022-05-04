import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import UserManagement from "./pages/showUsers";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/Login" exact element={<Login />} />
          <Route path="/Register" exact element={<Register />} />
          <Route path="/showUsers" exact element={<UserManagement />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
