import React, {useEffect} from 'react';
import './AuthenticationModal.css';
import {clearMyInterval, initApplicationState} from "../../../Store/ApplicationsReducer/applicationsActions";
import {useDispatch} from "react-redux";

const AuthenticationModal = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initApplicationState())
        dispatch(clearMyInterval())
    }, [])
    return (
        <div className="AuthenticationModal">
            <div className="AuthenticationModal__logo" />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default AuthenticationModal;