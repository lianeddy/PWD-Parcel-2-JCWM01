import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./adminSidebar.css";
import SidebarCollapse, {SidebarCollapse2} from "./sidebarCollapse";

function AdminSidebar() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-left bgbrandcolor shadow p-3">
            <div className="brand">Admin Panel</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 sidebarMenu shadow">
          <SidebarCollapse />
          <SidebarCollapse2 />
          </div>
        </div>
      </div>
    );
  }

export default AdminSidebar;