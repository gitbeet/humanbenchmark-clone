import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <div>footer</div>
    </div>
  );
};

export default Layout;
