import {
    PASSWORD_LOGIN_ERROR,
    PHONE_LOGIN_ERROR,
    SET_LOGIN_STATUS, SMS_LOGIN_ERROR,
    USERNAME_LOGIN_ERROR
} from "./usersActionTypes";


const initialState = {
    user: null,
    loginStatus: 'login',
    usernameLoginError: "",
    passwordLoginError: "",
    phoneLoginError: "",
    smsLoginError: "",
    hash: ""
}



const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERNAME_LOGIN_ERROR:
            return {...state, usernameLoginError: action.value}
        case PASSWORD_LOGIN_ERROR:
            return {...state, passwordLoginError: action.value}
        case PHONE_LOGIN_ERROR:
            return {...state, phoneLoginError: action.value}
        case SMS_LOGIN_ERROR:
            return {...state, smsLoginError: action.value}
        case SET_LOGIN_STATUS:
            return {...state, loginStatus: action.value};
        default:
            return state;
    }
}

export default usersReducer;