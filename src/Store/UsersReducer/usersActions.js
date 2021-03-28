
import axios from '../../axiosApi';
import {
    PASSWORD_LOGIN_ERROR,
    PHONE_LOGIN_ERROR,
    SET_LOGIN_STATUS,
    SMS_LOGIN_ERROR,
    USERNAME_LOGIN_ERROR
} from "./usersActionTypes";
import {push} from 'connected-react-router';
import {saveHash, saveId} from "../ApplicationsReducer/applicationsActions";


export const setLoginStatus = (value) => ({type: SET_LOGIN_STATUS, value});

export const usernameLoginError = (value) => ({type: USERNAME_LOGIN_ERROR, value});
export const passwordLoginError = (value) => ({type: PASSWORD_LOGIN_ERROR, value});
export const phoneLoginError = (value) => ({type: PHONE_LOGIN_ERROR, value});
export const smsLoginError = (value) => ({type: SMS_LOGIN_ERROR, value});


export const saveUser = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/users/${id}`);
            console.log("SAVING USER ", response.data)
        } catch (err) {
            console.log(err);
        }
    }
}
export const sendPhone = (phoneNumber, id) => {
    return async dispatch => {
        try {
            const response = await axios.post(`/users/${id}`, phoneNumber);
            console.log(response.data);
            await dispatch(setLoginStatus("sms"));

        } catch (err) {
            console.log("PHONE ERROR ", err);
            dispatch(phoneLoginError(err.response.status));
        }
    }
}

export const sendSms = (smsAndId) => {
    return async dispatch => {
        try {
            const response = await axios.post(`/users/sms_check`, smsAndId);
            console.log("HASH ", response.data);
            await dispatch(saveHash(response.data.hash));
            // await dispatch(saveId(response.data.clientId));
            await dispatch(push('/search'));
        } catch (err) {
            console.log("SMS ", err);
            dispatch(smsLoginError(err.response.status));
        }
    }
}

export const loginUser = (login, password) => {
    return async dispatch => {
        try {
            // const response = await axios.get(`/CRM/hs/authorizationLP/method/Login/?Login=${encodeURIComponent(login)}&Password=${encodeURIComponent(password)}`);
            const response = await axios.get(`/CRM/hs/authorizationLP/method/Login/?Login=${login}&Password=${password}`);
            await dispatch(saveHash(response.data.hash));
            // await dispatch(saveId(response.data.clientId));
            await dispatch(push('/search'));
            console.log(response.data);
        } catch (err) {
            console.log(err.response);
            // добавить условие какая именно ошибка прилетела
            try {
                dispatch(usernameLoginError(err.response.data.result));
                dispatch(passwordLoginError(err.response.data.result));
            } catch (err) {
                console.log(err)
            }


        }
    }
}
