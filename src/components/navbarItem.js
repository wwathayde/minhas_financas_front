import React from "react";

import { Link } from 'react-router-dom'

function NavbarItem({render, ...props}) {
    if (render) {
        return (
            <li className="nav-item" >
                <Link onClick={props.onClick} to={props.href} className="nav-link" ><u>{props.label}</u></Link>
            </li>
        );
    }
    return false
}

export default NavbarItem;