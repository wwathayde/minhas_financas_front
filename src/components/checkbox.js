import React from "react";

export default (props) => {
    const checkboxes = props.lista.map(e =>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value={e.value} id={"checkBox" + e.value} />
            <label className="form-check-label" for={"checkBox" + e.value} >
                {e.label}
            </label>
        </div>
    );

    return (
        <div className={props.clazz}>
            {checkboxes}
        </div>
    );
};
