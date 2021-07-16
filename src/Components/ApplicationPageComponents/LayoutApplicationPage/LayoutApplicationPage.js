import React from 'react';
import Logo from '../Logo/Logo';
import SocialNetworkLinks from '../SocialNetworkLinks/SocialNetworkLinks';
import WhiteButton from '../WhiteButton/WhiteButton';
import './LayoutApplicationPage.css';

const LayoutApplicationPage = (props) => {

    return (
        <div className="LayoutApplicationPage">
            <div className="LayoutApplicationPage_sidebar">
                <Logo 
                    logoLink={props.createNewApplication}
                />
                <div className="LayoutApplicationPage__prev-menu">{props.left}</div>
                <div className={"WhiteButton--heightStabilizer"} />
                <WhiteButton 
                    name="Создать новую заявку"
                    clicked={props.createNewApplication}
                    hide={props.hideButton}
                />
                <WhiteButton  
                    name={"Посмотреть историю моих заявок"}
                    clicked={props.goToApplicationHistory}
                />
                <SocialNetworkLinks 
                    introText={"Мы в социальных сетях"}
                    instagram={"https://www.instagram.com/itsupport.kz/?hl=ru"}
                    facebook={"https://www.facebook.com/itsupport.kz/"}
                    linkedin={"https://www.linkedin.com/company/it-support-group-kazakhstan?originalSubdomain=kz"}
                    youtube={"https://www.youtube.com/channel/UCsnFSIp17CHdL-h69_8mgnQ"}
                />
            </div>
            <div className="LayoutApplicationPage__main">
                <div className="LayoutApplicationPage__top">{props.top}</div>
                <div className="LayoutApplicationPage__center">{props.center}</div>
            </div>
        </div>
    )
}

export default LayoutApplicationPage;