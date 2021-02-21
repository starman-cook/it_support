import {GET_ALL_DEPARTMENTS, GET_ALL_EMPLOYEES, GET_COMPANY_DATA} from "./companyActionTypes";
// import axios from '../../axiosApi';
import axios from '../../axiosApi';

export const getCompanyDataSuccess = (value) => ({type: GET_COMPANY_DATA, value});
export const getAllDepartments = (value) => ({type: GET_ALL_DEPARTMENTS, value});
export const getAllEmployees = (value) => ({type: GET_ALL_EMPLOYEES, value});

// aad6d2c1b77801e269628f235dd7cbaa
export const getCompanyData = (hash) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/CRM/hs/header/method/info?hash=${hash}`);
            dispatch(getCompanyDataSuccess(response.data));
        } catch (err) {
            console.log(err);
        }
    }
}