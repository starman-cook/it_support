
import update from 'immutability-helper';
import {GET_COMPANY_DATA} from "./companyActionTypes";

const initialState = {
    companyData: {}
};

const companyDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPANY_DATA:
            return {...state, companyData: action.value};
        default:
            return state;
    }
};

export default companyDataReducer;
