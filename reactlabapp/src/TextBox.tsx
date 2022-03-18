import React from "react";

function TextBox(props: any) {

    return (
        <div className="TextBox">
            <label>{props.label}</label>
            <input type="text" onChange={props.change}/>
        </div>
    );
}

export default TextBox