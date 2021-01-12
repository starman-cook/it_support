import React from 'react';
import './BlueButton.css'


const BlueButton = (props) => {
    return (
        <>
        <button type={props.type} disabled={props.isDisabled} className="BlueButton" onClick={props.clicked}>{props.name}</button>
        </>
    )
}

export default BlueButton;