import React from 'react';
import { useHistory } from 'react-router';
import Logo from '../Logo/Logo';
import SocialNetworkLinks from '../SocialNetworkLinks/SocialNetworkLinks';
import WhiteButton from '../WhiteButton/WhiteButton';
import './LayoutApplicationPage.css';

const LayoutApplicationPage = (props) => {
    const history = useHistory();


    const goToApplication = () => {
        history.push("/application")
    }
    return (
        <div className="LayoutApplicationPage">
            <div className="LayoutApplicationPage_sidebar">
                <Logo 
                    logoLink={() => {goToApplication()}}
                />
                <div className="LayoutApplicationPage__prev-menu">{props.left}</div>
                <WhiteButton 
                    name="Создать новую заявку"
                    clicked={() => {goToApplication()}}
                />
                <WhiteButton  
                    name={"Посмотреть историю моих заявок"}
                    // clicked={}
                />
                <SocialNetworkLinks 
                    introText={"Мы в социальных сетях"}
                    // instagram={}
                    // facebook={}
                    // linkedin={}
                    // youtube={}
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