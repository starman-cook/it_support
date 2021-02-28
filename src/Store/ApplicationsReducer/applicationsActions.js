import {
    ADD_COMMENT,
    CHANGE_DEPARTMENT,
    CHANGE_EMPLOYEE,
    CHANGE_NUMBER,
    CHANGE_PAGINATION,
    CHANGE_STATUS, FIRST_CALENDAR_DAY_IN_RANGE,
    GET_COUNT_AMOUNT,
    GET_TEN_APPLICATIONS,
    INIT_FILTERS,
    INPUT_FILTER_DATE_FROM,
    INPUT_FILTER_DATE_TO,
    IS_FILTER_DATE_ACTIVE,
    SAVE_HASH,
    SAVE_ID, SECOND_CALENDAR_DAY_IN_RANGE,
    SET_ACTIVE_FILTERS,
    SET_ACTIVE_PAGE
} from "./applicationsActionTypes";
import axios from "../../axiosApi";

export const addComment = (value) => ({type: ADD_COMMENT, value});
export const getTenApplicationsSuccess = (value) => ({type: GET_TEN_APPLICATIONS, value});
export const getCountAmount = (value) => ({type: GET_COUNT_AMOUNT, value});
export const inputFilterDateFrom = (value) => ({type: INPUT_FILTER_DATE_FROM, value});
export const inputFilterDateTo = (value) => ({type: INPUT_FILTER_DATE_TO, value});
export const setActiveFilters = (value) => ({type: SET_ACTIVE_FILTERS, value});

export const changePagination = (value) => ({type: CHANGE_PAGINATION, value});

export const changeStatus = (value) => ({type: CHANGE_STATUS, value});
export const changeDepartment = (value) => ({type: CHANGE_DEPARTMENT, value});
export const changeEmployee = (value) => ({type: CHANGE_EMPLOYEE, value});
export const changeNumber = (value) => ({type: CHANGE_NUMBER, value});
export const initFilters = () => ({type: INIT_FILTERS});

export const setActivePage = (value) => ({type: SET_ACTIVE_PAGE, value});

export const saveHash = (value) => ({type: SAVE_HASH, value});
export const  saveId = (value) => ({type: SAVE_ID, value});

export const isFilterDateActive = (value) => ({type: IS_FILTER_DATE_ACTIVE, value});

export const setFirstCalendarDay = (value) => ({type: FIRST_CALENDAR_DAY_IN_RANGE, value});
export const setSecondCalendarDay = (value) => ({type: SECOND_CALENDAR_DAY_IN_RANGE, value});

export const getTenApplications = (data) => {
    return async dispatch => {
        try {
            await axios.post('/CRM/hs/Events/method/history', data)
                .then(response => {
                    dispatch(getTenApplicationsSuccess(response.data.events));
                    dispatch(getCountAmount(response.data.count));
                });
        } catch (e) {
            console.log(e);
        }
    }
}