import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Successful from "./components/Successful";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="successful" element={<Successful />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
