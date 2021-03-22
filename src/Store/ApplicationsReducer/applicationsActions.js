import {
    // ADD_COMMENT,
    CHANGE_DEPARTMENT,
    CHANGE_EMPLOYEE,
    CHANGE_NUMBER,
    CHANGE_PAGINATION,
    CHANGE_STATUS, CLEAR_INTERVAL, FIRST_CALENDAR_DAY_IN_RANGE,
    GET_COUNT_AMOUNT, GET_CURRENT_APPLICATION_DATA, GET_HASH_OF_THE_LAST_APPLICATION, GET_LAST_APPLICATION,
    GET_TEN_APPLICATIONS,
    INIT_FILTERS,
    INPUT_FILTER_DATE_FROM,
    INPUT_FILTER_DATE_TO,
    IS_FILTER_DATE_ACTIVE,
    SAVE_HASH,
    SAVE_ID, SECOND_CALENDAR_DAY_IN_RANGE,
    SET_ACTIVE_FILTERS,
    SET_ACTIVE_PAGE, SET_INTERVAL
} from "./applicationsActionTypes";
import axios from "../../axiosApi";
import axiosTest from 'axios';

// export const addComment = (value) => ({type: ADD_COMMENT, value});
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

export const getHashOfTheLastApplication = (value) => ({type: GET_HASH_OF_THE_LAST_APPLICATION, value});

export const getCurrentApplicationDataSuccess = (value) => ({type: GET_CURRENT_APPLICATION_DATA, value});

export const setMyInterval = (value) => ({type: SET_INTERVAL, value});
export const clearMyInteval = () => ({type: CLEAR_INTERVAL});

    export const getTenApplications = (data) => {
    return async dispatch => {
        try {
            await axios.post('/CRM/hs/Events/method/history', data)
                .then(response => {
                    dispatch(getTenApplicationsSuccess(response.data.events));
                    dispatch(getCountAmount(response.data.count));
                });
        } catch (err) {
            console.log(err);
        }
    }
}
export const getLastApplicationSuccess = (value) => ({type: GET_LAST_APPLICATION, value});


export const getLastApplication = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/CRM/hs/event/method/lastevent/?id=${id}`);
            dispatch(getLastApplicationSuccess(response.data));
        } catch (err) {
            console.log(err);
        }
    }
}

export const postNewApplication = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post('/CRM/hs/event/method/create', data);
            dispatch(getHashOfTheLastApplication(response.data.eventID))
            // const response = await axiosTest.post('https://itsupport.kz/itsp2/proxy.php?act=createEvent', data);
            console.log("RESPONSE! ", response.data);
        } catch(err) {
            console.log(err);
        }
    }
}

export const getCurrentApplicationData = (id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/CRM/hs/equeue/?document=${id}`);
            await dispatch(getCurrentApplicationDataSuccess(response.data));
        } catch(err) {
            console.log(err)
        }
    }
}
// "b0137ac723e6acb741bd3b49b45f6a58"
// http://itsupport.kz:8000/CRM/hs/equeue/?document=976b60043d04c86e4936b78fa0b82b07

export const addDetailsToApplicationInProcess = (data) => {
    return async dispatch => {
        try {
            await axios.post('/CRM/hs/event/method/eventupdatebody/', data)
        } catch(err) {
            console.log(err)
        }
    }
}

// не работает((((
export const setApplicationBackInProgress = (id) => {
    return async dispatch => {
        try {
            await axios.get(`/CRM/hs/eventupdate/?document=${id}`);
            // await axiosTest.get(`https://itsupport.kz/itsp2/eventupdate/proxy.php?document=${id}`);
        } catch (err) {
            console.log(err);
        }
    }
}

