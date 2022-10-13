import React from "react";

function FormGroup(props) {
    return(
        <div className="form-group mb-3">
            <label className="form-label" htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    );
}

export default FormGroup;
