import React from 'react';
import './SocialNetworkLinks.css';


const SocialNetworkLinks = (props) => {
    return (
        <div className="SocialNetwork">
            <span className="SocialNetwork__text">{props.introText}</span>
            <a className="SocialNetwork__aTag"  href={props.instagram}><i className="SocialNetwork__link SocialNetwork__instagram"></i></a>
            <a className="SocialNetwork__aTag"  href={props.facebook}><i className="SocialNetwork__link SocialNetwork__facebook"></i></a>
            <a className="SocialNetwork__aTag"  href={props.linkedin}><i className="SocialNetwork__link SocialNetwork__linkedin"></i></a>
            <a className="SocialNetwork__aTag"  href={props.youtube}><i className="SocialNetwork__link SocialNetwork__youtube"></i></a>
        </div>
    )
}

export default SocialNetworkLinks;