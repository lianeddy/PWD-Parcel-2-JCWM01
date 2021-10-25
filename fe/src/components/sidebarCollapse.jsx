import React, { useState } from 'react';
import { Collapse, NavLink } from 'reactstrap';
import "./adminSidebar.css";

const SidebarCollapse = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className= "mt-3" onClick={toggle}>+  Product Management</div>
      <Collapse isOpen={isOpen}>
        <NavLink>Item</NavLink>
        <NavLink>Parcel</NavLink>
      </Collapse>
    </div>
  );
}

export const SidebarCollapse2 = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className= "mt-3" onClick={toggle}>+  Sales Management</div>
      <Collapse isOpen={isOpen}>
        <NavLink>Revenue</NavLink>
        <NavLink>Transaction</NavLink>
      </Collapse>
    </div>
  );
}


export default SidebarCollapse;
