import React from 'react';
import './RedButton.css'


const RedButton = (props) => {
    return (
        <>
        <button disabled={props.disabled} className="RedButton" onClick={props.clicked}>{props.name}</button>
        </>
    )
}

export default RedButton;