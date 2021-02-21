
import {GET_COMPANY_DATA, GET_ALL_DEPARTMENTS, GET_ALL_EMPLOYEES} from "./companyActionTypes";

const initialState = {
    companyData: {},
    departments: [],
    employees: [],
};

const companyDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DEPARTMENTS:
            return {...state, departments: action.value};
        case GET_ALL_EMPLOYEES:
            return {...state, employees: action.value};
        case GET_COMPANY_DATA:
            return {...state, companyData: action.value};
        default:
            return state;
    }
};

export default companyDataReducer;
