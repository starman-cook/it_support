import {
    ADD_COMMENT,
    CHANGE_DEPARTMENT,
    CHANGE_EMPLOYEE,
    CHANGE_NUMBER,
    CHANGE_PAGINATION,
    CHANGE_STATUS,
    GET_COUNT_AMOUNT,
    GET_TEN_APPLICATIONS,
    INIT_FILTERS,
    INPUT_FILTER_DATE_FROM,
    INPUT_FILTER_DATE_TO,
    SET_ACTIVE_FILTERS,
    SET_ACTIVE_PAGE,
    SAVE_HASH,
    SAVE_ID,
    IS_FILTER_DATE_ACTIVE,
    FIRST_CALENDAR_DAY_IN_RANGE,
    SECOND_CALENDAR_DAY_IN_RANGE,
    GET_LAST_APPLICATION,
    GET_HASH_OF_THE_LAST_APPLICATION,
    GET_CURRENT_APPLICATION_DATA,
    SET_INTERVAL,
    CLEAR_INTERVAL,
    GET_CLIENT_NAME
} from "./applicationsActionTypes";
import update from 'immutability-helper';
import moment from "moment";

//ID SAMPLE    1240-02-00044
//HASH SAMPLE  4be9fd6e92f21fc38674ec51d5e4d237
// aad6d2c1b77801e269628f235dd7cbaa hash from 1240 doesnt work
const initialState = {
    interval: null,
    lastApplication: null,
    firstCalendarRangeDay: 0,
    secondCalendarRangeDay: 0,
    newApplicationHash: null,
    currentApplicationData: null,
    // comments: [],
    applications: [],
    count: 0,
    data: {
        clientId: "",
        hash: "",
        filter: {
            date: {
                from: "",
                to: ""
            },
            status: [],
            employee: " ",
            departament: [],
            number: ""
        },
        limit: 10,
        start: 0
    },
    activePage: 1,
    activeFilters: [],
    isFilterDateActive: false,
    clientName: ""
};

const applicationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLIENT_NAME:
            return {...state, clientName: action.value}
        case CLEAR_INTERVAL:
            return {...state, interval: clearInterval(state.interval)}
        case SET_INTERVAL:
            return {...state, interval: action.value}
        case GET_CURRENT_APPLICATION_DATA:
            return {...state, currentApplicationData: action.value}
        case GET_HASH_OF_THE_LAST_APPLICATION:
            return {...state, newApplicationHash: action.value}
        case GET_LAST_APPLICATION:
            return {...state, lastApplication: action.value};
        case FIRST_CALENDAR_DAY_IN_RANGE:
            return {...state, firstCalendarRangeDay: action.value};
        case SECOND_CALENDAR_DAY_IN_RANGE:
            return {...state, secondCalendarRangeDay: action.value};
        case IS_FILTER_DATE_ACTIVE:
            return {...state, isFilterDateActive: action.value};
        case SAVE_ID:
            return update(state, {
                data: {
                    clientId: {$set: action.value}
                }
            });
        case SAVE_HASH:
            return update(state, {
                data: {
                    hash: {$set: action.value}
                }
        });
        // case ADD_COMMENT:
        //     return {...state, comments: [...state.comments, action.value]};
        case GET_TEN_APPLICATIONS:
            return {...state, applications: action.value};
        case GET_COUNT_AMOUNT:
            return {...state, count: action.value};
        case INPUT_FILTER_DATE_FROM:
            return update(state, {
                data: {
                    filter: {
                        date: {
                            from: {$set: action.value}
                        }
                    }
                }
            });
        case INPUT_FILTER_DATE_TO:
            return update(state, {
                data: {
                    filter: {
                        date: {
                            to: {$set: action.value}
                        }
                    }
                }
            });
        case CHANGE_PAGINATION:
            return update(state, {
                data: {
                    start: {$set: action.value}
                }
            });
        case CHANGE_STATUS:
            return update(state, {
                data: {
                    filter: {
                        status: {$set: action.value}
                    }
                }
            });
        case CHANGE_DEPARTMENT:
            return update(state, {
                data: {
                    filter: {
                        departament: {$set: action.value}
                    }
                }
            });
        case CHANGE_EMPLOYEE:
            return update(state, {
                data: {
                    filter: {
                        employee: {$set: action.value}
                    }
                }
            });
        case CHANGE_NUMBER:
            return update(state, {
                data: {
                    filter: {
                        number: {$set: action.value}
                    }
                }
            });
        case INIT_FILTERS:
            return update(state, {
                data: {
                    filter: {
                        status: {$set: []},
                        departament: {$set: []},
                        employee: {$set: ''},
                        number: {$set: ''}
                    }
                }
            })
        case SET_ACTIVE_PAGE:
            return {...state, activePage: action.value};
        case SET_ACTIVE_FILTERS:
            return {...state, activeFilters: action.value}
        default:
            return state;
    }
};

export default applicationsReducer;



//
// {
//     date: "03. 11. 2019, 10:50",
//         status: "запланировано",
//     subject:"Най",
//     department: "Уа",
//     specialist: "Ана",
//     specialistId:"IT",
//     solution: "Б ",
//     classLikeDislike: "like",
//     isComment: true,
//     comment: 'Comment',
//     worker: 'Примерный рабочий',
//     workerId: "ID 3245875",
//     specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//     fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//     applicationId: "IT-011220-039862",
//     problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// },{
//     date: "03. 11. 2019, 10:50",
//         status: "в работе",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправ Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправ",
//         classLikeDislike: null,
//         isComment: false,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "завершено",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: null,
//         isComment: true,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "отменено",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: "dislike",
//         isComment: true,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "запланировано",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: "like",
//         isComment: false,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "запланировано",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: "like",
//         isComment: true,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "в работе",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: null,
//         isComment: false,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "завершено",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: null,
//         isComment: true,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "отменено",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: "dislike",
//         isComment: true,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }, {
//     date: "03. 11. 2019, 10:50",
//         status: "запланировано",
//         subject:"Не работает вайфай",
//         department: "Удаленная поддержка",
//         specialist: "Александра Панарина",
//         specialistId:"IT 152",
//         solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike: "like",
//         isComment: false,
//         comment: 'Comment',
//         worker: 'Примерный рабочий',
//         workerId: "ID 3245875",
//         specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId: "IT-011220-039862",
//         problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }

//         date dateCreate: "03. 11. 2019, 10:50",
//         status status: "запланировано",
//         subject subject:"Не работает вайфай",
//         department department: "Удаленная поддержка",
//         specialist implementer.name: "Александра Панарина",
//         specialistId implementer.id:"IT 152",
//         solution outcome: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
//         classLikeDislike rating: "like",
//         isComment: false,
//         comment: 'Comment',
//         worker employee.name: 'Примерный рабочий',
//         workerId employee.id: "ID 3245875",
//         specialistPhoto implementer.photo: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         fileImage images[0]: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
//         applicationId number: "IT-011220-039862",
//         problem details: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал."
// }