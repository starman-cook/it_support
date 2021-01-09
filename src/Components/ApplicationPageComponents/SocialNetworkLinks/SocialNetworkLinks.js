import React from 'react';
import './SocialNetworkLinks.css';


const SocialNetworkLinks = (props) => {
    return (
        <div className="SocialNetwork">
            <span className="SocialNetwork__text">{props.introText}</span>
            <a className="SocialNetwork__link SocialNetwork__instagram" href={props.instagram}></a>
            <a className="SocialNetwork__link SocialNetwork__facebook" href={props.facebook}></a>
            <a className="SocialNetwork__link SocialNetwork__linkedin" href={props.linkedin}></a>
            <a className="SocialNetwork__link SocialNetwork__youtube" href={props.youtube}></a>
        </div>
    )
}

export default SocialNetworkLinks;