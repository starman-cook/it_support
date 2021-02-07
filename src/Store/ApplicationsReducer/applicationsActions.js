import {
    ADD_COMMENT,
    CHANGE_PAGINATION,
    GET_COUNT_AMOUNT,
    GET_TEN_APPLICATIONS,
    INPUT_FILTER_DATE_FROM, INPUT_FILTER_DATE_TO
} from "./applicationsActionTypes";
import axios from "../../axiosApi";

export const addComment = (value) => ({type: ADD_COMMENT, value});
export const getTenApplicationsSuccess = (value) => ({type: GET_TEN_APPLICATIONS, value});
export const getCountAmount = (value) => ({type: GET_COUNT_AMOUNT, value});
export const inputFilterDateFrom = (value) => ({type: INPUT_FILTER_DATE_FROM, value});
export const inputFilterDateTo = (value) => ({type: INPUT_FILTER_DATE_TO, value});

export const changePagination = (value) => ({type: CHANGE_PAGINATION, value});

export const getTenApplications = (data) => {
    return async dispatch => {
        try {
            await axios.post('/CRM_16_06_2020/hs/Events/method/history', data)
                .then(response => {
                    dispatch(getTenApplicationsSuccess(response.data.events));
                    dispatch(getCountAmount(response.data.count));
                });
        } catch (e) {
            console.log(e);
        }
    }
}