import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as filepaths from "./constants/filepaths";
import { useSelector } from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

import { FaHouseChimney } from "react-icons/fa6";
import { FaSearch, FaClipboardList, FaShieldAlt } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { RiLoginCircleFill } from "react-icons/ri";

function Nav() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.userReducer);


  const links = [
    { to: filepaths.HOME_PATH, label: "Home", req: true, icon:<FaHouseChimney className="mb-1 me-1"/> },
    { to: filepaths.SEARCH_PATH, label: "Search", req: true, icon:<FaSearch className="mb-1 me-1" /> },
    { to: filepaths.LOGIN_PATH, label: "Login", req: !currentUser, icon:<RiLoginCircleFill className="mb-1 me-1" /> },
    { to: filepaths.REGISTER_PATH, label: "Register", req: !currentUser, icon:<FaClipboardList className="mb-1 me-1" /> },
    { to: filepaths.PROFILE_PATH, label: "Profile", req: currentUser, icon:<BsPersonCircle className="mb-1 me-1" /> },
    { to: "/admin/users", label: "Admin", req: currentUser && currentUser.role==="ADMIN", icon:<FaShieldAlt className="mb-1 me-1" /> },
  ];
  const active = (path) => (pathname.includes(path) ? "active" : "");

  return (
    <ListGroup horizontal className="w-100 px-0 py-0 mx-0 my-0 wd-sharp-borders">
      {links.map((link) => 
        link.req && 
        (<ListGroupItem variant="light" className="w-100 px-0 py-0 mx-0 my-0">
        <Link
            key={link.to}
            to={link.to}
            className={`list-group-item ${active(link.to)}`}
            id="wd-sharp-borders"
          >
            {link.icon}{link.label}
        </Link>
        </ListGroupItem>)
      )}
    </ListGroup>
  );
}

export default Nav;
