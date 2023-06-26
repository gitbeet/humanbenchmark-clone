import React from "react";
import Header from "./Header";

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <div>footer</div>
    </div>
  );
};

export default Layout;
