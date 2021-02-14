import {GET_COMPANY_DATA} from "./companyActionTypes";
// import axios from '../../axiosApi';
import axios from '../../axiosApi';

export const getCompanyDataSuccess = (value) => ({type: GET_COMPANY_DATA, value});

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