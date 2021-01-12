import React from 'react';
import './WhiteButton.css'


const WhiteButton = (props) => {
    return (
        <>
        {props.hide ? <div className="WhiteButton--heightStabilizer"></div> : null}
        <button style={props.hide ? {"display" : "none"}: null} disabled={props.disabled} className="WhiteButton" onClick={props.clicked}>{props.name}</button>
        </>
    )
}

export default WhiteButton;