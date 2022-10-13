import React from "react";

export default (props) => {
    const options = props.lista.map((e, index) =>
        <option key={index} value={e.value} >{e.label}</option>
    );

    return (
        <select className={props.clazz} {...props} >
            {options}
        </select>
    );
};
