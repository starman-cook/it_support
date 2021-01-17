import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button
            onClick={props.clicked}
            className={`ButtonLogin ${props.class}`}
            style={{width: `${props.width}px`}}
        >
            {props.name}
        </button>
    )
}

export default Button;