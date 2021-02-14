import {SAVE_HASH, SET_LOGIN_STATUS} from "./usersActionTypes";


const initialState = {
    user: null,
    loginStatus: 'phone',
    hash: ""
}



const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return {...state, loginStatus: action.value};
        default:
            return state;
    }
}

export default usersReducer;