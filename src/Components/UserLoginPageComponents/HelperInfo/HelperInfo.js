import React from 'react';
import './HelperInfo.css';

const HelperInfo = (props) => {
    return (
        <div className="HelperInfo">
            <p style={props.grey ? {color: "#BDBDBD"} : null} className="HelperInfo__text">{props.question}</p>
            <a className="HelperInfo__link" href={props.link}>{props.textLink}</a>
            <p style={props.grey ? {color: "#BDBDBD"} : null} className="HelperInfo__text">{props.contacts}</p>

            <div className="HelperInfo__socialBlock">
                <a href={props.instagram} className="HelperInfo__icon HelperInfo__instagram" />
                <a href={props.facebook} className="HelperInfo__icon HelperInfo__facebook" />
                <a href={props.linkedin} className="HelperInfo__icon HelperInfo__linkedin" />
                <a href={props.youtube} className="HelperInfo__icon HelperInfo__youtube" />
            </div>
        </div>
    )
}

export default HelperInfo;