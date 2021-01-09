import React from 'react';
import './WhiteButton.css'


const WhiteButton = (props) => {
    return (
        <>
        <button disabled={props.disabled} className="WhiteButton" onClick={props.clicked}>{props.name}</button>
        </>
    )
}

export default WhiteButton;