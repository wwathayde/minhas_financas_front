import React from "react";

import { Link } from 'react-router-dom'

function NavbarItem(props) {
    return (
        <li className="nav-item" >
            <Link onClick={props.onClick} to={props.href} className="nav-link" ><u>{props.label}</u></Link>
        </li>
    );
}

export default NavbarItem;