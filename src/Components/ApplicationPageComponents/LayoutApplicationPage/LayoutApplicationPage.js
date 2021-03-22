import React from 'react';
import Logo from '../Logo/Logo';
import SocialNetworkLinks from '../SocialNetworkLinks/SocialNetworkLinks';
import WhiteButton from '../WhiteButton/WhiteButton';
import './LayoutApplicationPage.css';
import {push} from 'connected-react-router';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {
    getCurrentApplicationData,
    getHashOfTheLastApplication
} from "../../../Store/ApplicationsReducer/applicationsActions";
// import queryString from 'query-string';

const LayoutApplicationPage = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const id = props;
    let id = history.location.pathname.split('/')[2];
    console.log("QUERY TEST ", id);

    // const goToApplication = () => {
    //     if (id) {
    //         dispatch(push(`/application/${id}`));
    //     } else {
    //         dispatch(push(`/application/anonymous`));
    //     }
    //     dispatch(getHashOfTheLastApplication(""))
    //     dispatch(getCurrentApplicationData(""))
    // };
    // const goToHistoryOfApplications = () => {
    //     dispatch(push("/search"));
    // };

    return (
        <div className="LayoutApplicationPage">
            <div className="LayoutApplicationPage_sidebar">
                <Logo 
                    logoLink={props.createNewApplication}
                />
                <div className="LayoutApplicationPage__prev-menu">{props.left}</div>
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