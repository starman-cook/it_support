import React from 'react';
import './ButtonGrey.css';

const ButtonGrey = (props) => {
    return (
        <>
        <button className="ButtonGrey" onClick={props.clicked}>{props.name}</button>
        </>
    )
}

export default ButtonGrey;