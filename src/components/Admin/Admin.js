import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState("true");

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <FaBars onClick={() => setCollapsed(!collapsed)} />
      <div className="admin-content">asdfasdf</div>
    </div>
  );
};

export default Admin;
