
import axios from '../../axiosApi';
import {
    PASSWORD_LOGIN_ERROR,
    PHONE_LOGIN_ERROR,
    SET_LOGIN_STATUS,
    SMS_LOGIN_ERROR,
    USERNAME_LOGIN_ERROR
} from "./usersActionTypes";
import {push} from 'connected-react-router';
import {saveHash} from "../ApplicationsReducer/applicationsActions";


export const setLoginStatus = (value) => ({type: SET_LOGIN_STATUS, value});

export const usernameLoginError = (value) => ({type: USERNAME_LOGIN_ERROR, value});
export const passwordLoginError = (value) => ({type: PASSWORD_LOGIN_ERROR, value});
export const phoneLoginError = (value) => ({type: PHONE_LOGIN_ERROR, value});
export const smsLoginError = (value) => ({type: SMS_LOGIN_ERROR, value});


export const saveUser = (id) => {
    return async dispatch => {
        try {
            await axios.get(`/users/${id}`);
        } catch (err) {
            console.log(err);
        }
    }
}
export const sendPhone = (phoneNumber, id) => {
    return async dispatch => {
        try {
            await axios.post(`/users/${id}`, phoneNumber);
            await dispatch(setLoginStatus("sms"));

        } catch (err) {
            dispatch(phoneLoginError("denied"));
        }
    }
}

export const sendSms = (smsAndId) => {
    return async dispatch => {
        try {
            const response = await axios.post(`/users/sms_check`, smsAndId);
            await dispatch(saveHash(response.data.hash));
            await dispatch(push('/search'));
        } catch (err) {
            dispatch(smsLoginError("denied"));
        }
    }
}

export const loginUser = (login, password) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/CRM/hs/authorizationLP/method/Login/?Login=${login}&Password=${password}`);
            await dispatch(saveHash(response.data.hash));
            await dispatch(push('/search'));
        } catch (error) {
            try {
                dispatch(usernameLoginError(error));
                dispatch(passwordLoginError(error));
            } catch (err) {
                dispatch(push('/error'))
            }


        }
    }
}
