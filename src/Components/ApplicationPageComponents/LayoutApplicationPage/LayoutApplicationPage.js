import React from 'react';
import Logo from '../Logo/Logo';
import SocialNetworkLinks from '../SocialNetworkLinks/SocialNetworkLinks';
import WhiteButton from '../WhiteButton/WhiteButton';
import './LayoutApplicationPage.css';
import {push} from 'connected-react-router';
import {useDispatch} from "react-redux";

const LayoutApplicationPage = (props) => {
    const dispatch = useDispatch();


    const goToApplication = () => {
        dispatch(push("/application"));
    };
    const goToHistoryOfApplications = () => {
        dispatch(push("/search"));
    };

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
                    hide={props.hideButton}
                />
                <WhiteButton  
                    name={"Посмотреть историю моих заявок"}
                    clicked={() => {goToHistoryOfApplications()}}
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