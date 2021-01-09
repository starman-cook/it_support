import React from 'react';
import './Logo.css';


const Logo = (props) => {
    return (
        <div onClick={props.logoLink} className="LogoFrame" />
    )
}

export default Logo;