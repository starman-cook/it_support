
import axios from '../../axiosApi';
import { SET_LOGIN_STATUS} from "./usersActionTypes";
import {push} from 'connected-react-router';
import {saveHash} from "../ApplicationsReducer/applicationsActions";


export const setLoginStatus = (value) => ({type: SET_LOGIN_STATUS, value});

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
        } catch (err) {
            console.log(err);
        }
    }
}

export const sendSms = (smsAndId) => {
    return async dispatch => {
        try {
            const response = await axios.post(`/users/sms_check`, smsAndId);
            console.log("HASH ", response.data);
            await dispatch(saveHash(response.data.hash));
            await dispatch(push('/search'));
        } catch (err) {
            console.log(err);
        }
    }
}
