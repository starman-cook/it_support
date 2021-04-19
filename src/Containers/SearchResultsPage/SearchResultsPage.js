import React, { useState, useEffect } from 'react';
import LayoutSearchResults from '../../Components/SearchResultsComponents/LayoutSearchResults/LayoutSearchResults';
import ResultsTableWorker from '../../Components/SearchResultsComponents/ResultsTableWorker/ResultsTableWorker';
import './SearchResultsPage.css';
import {useDispatch, useSelector} from "react-redux";
import {
    changePagination, clearMyInteval,
    inputFilterDateFrom,
    inputFilterDateTo, isFilterDateActive, setActivePage
} from "../../Store/ApplicationsReducer/applicationsActions";
import moment from 'moment';
import {getCompanyData} from "../../Store/CompanyDataReducer/companyActions";
import {push} from 'connected-react-router';
import ModalPeriod from "../../Components/SearchResultsComponents/ModalPeriod/ModalPeriod";
import axios from "../../axiosApi";
import WithLoader from '../../hoc/WithLoader/WithLoader';

const SearchResultsPage = () => {
    const dispatch = useDispatch();

    const [period, setPeriod] = useState({
        start: 'ДД/ММ/ГГ',
        startOrigin: 'ДД/ММ/ГГ',
        end: 'ДД/ММ/ГГ',
        endOrigin: 'ДД/ММ/ГГ'
    });
    let filters = useSelector(state => state.applications.activeFilters);
    const dateFromState = useSelector(state => state.applications.data.filter.date);
    const isDateFilterActive = useSelector(state => state.applications.isFilterDateActive)
    const hash = useSelector(state => state.applications.data.hash)
    useEffect(() => {
        dispatch(clearMyInteval())
        if (!hash) return dispatch(push('/login'));
        dispatch(getCompanyData(hash));
    }, [dispatch]);

    useEffect(() => {
        if (!isDateFilterActive) {
            console.log("FILTERS DOESNT INCLUDE DATE TIME")
            setPeriod(prevState => {
                return {...prevState, startOrigin: 'ДД/ММ/ГГ', endOrigin: 'ДД/ММ/ГГ'}
            });
        } else {
            console.log("DATE IN FILTERS")
            setPeriod(prevState => {
                return {...prevState, startOrigin: dateFromState.from, endOrigin: dateFromState.to}
        })
        }
    }, [filters]);



    const dateStart = filters.includes('дата') ?  [dateFromState.from.slice(0, 4), "-", dateFromState.from.slice(4, 6), "-", dateFromState.from.slice(6)].join('') : period.startOrigin;
    const dateEnd = filters.includes('дата') ?  [dateFromState.to.slice(0, 4), "-", dateFromState.to.slice(4, 6), "-", dateFromState.to.slice(6)].join('') : period.endOrigin;
    const company = useSelector(state => state.company.companyData);
    let equipmentId;
    let workerName;
    let companyName;
    if (company) {
        equipmentId = company.director ? company.director.id : company.employee ? company.employee.id : "";
        workerName = company.employee ? company.employee.name : '';
        companyName =  company.company;
    }

    const companyLogo = useSelector(state => state.company.companyData['logo']);
    const [showQuestion, setShowQuestion] = useState(false);
    const [calendarModal, setCalendarModal] = useState(false);

    
    

    const activePage = useSelector(state => state.applications.activePage);
    const count = useSelector(state => state.applications.count);

    let pagesNumbers = Math.ceil(count / 10); // получать количество страниц для пагинации и кидать число в цикл, чтобы получить массив, нужен для отрисовки



    let tableView;
    let allPages;
    let allFilters;
    const hoverShowQuestion = () => {
        setShowQuestion(true);
    }
    const hoverHideQuestion = () => {
        setShowQuestion(false);
    }

    const [deactivateBtnDate, setDeactivateBtn] = useState({});
    const chooseDateBtnSimple = (event) => {
        const el = document.getElementsByClassName('LayoutSearchResults__btnDate');
        for (let i = 0; i < el.length; i++) {
            el[i].style.color = '#E34A4E';
            el[i].style.background = 'white';
        }
        const innerText = event.target.textContent;
        if (deactivateBtnDate[innerText]) {
            setDeactivateBtn({});
            deactivateDateFilter();
            return;
        }
        setDeactivateBtn({[event.target.textContent]: true});
        event.target.style.color = 'white';
        event.target.style.background = '#E34A4E';
        if (innerText === 'Период') {
            setCalendarModal(true);
        } else {
            let today = moment().format("YYYYMMDD");
            let chosenDate;
            dispatch(changePagination(0));
            dispatch(setActivePage(1));
            switch (innerText) {
                case "Сегодня":
                    chosenDate = today;
                    break;
                case "Вчера":
                    chosenDate = moment().subtract(1, 'days').format("YYYYMMDD");
                    today = moment().subtract(1, 'days').format("YYYYMMDD");
                    break;
                case "Неделя":
                    chosenDate = moment().subtract(7, 'days').format("YYYYMMDD");
                    break;
                case "Месяц":
                    chosenDate = moment().subtract(1, 'months').format("YYYYMMDD");
                    break;
                case "Квартал":
                    chosenDate = moment().subtract(3, 'months').format("YYYYMMDD");
                    break;
                case "Полугодие":
                    chosenDate = moment().subtract(6, 'months').format("YYYYMMDD");
                    break;
                default:
                    break;
            }
            dispatch(inputFilterDateFrom(chosenDate));
            dispatch(inputFilterDateTo(today));
            dispatch(isFilterDateActive(true));
            const formatStartDate = [today.slice(0, 4), "-", today.slice(4, 6), "-", today.slice(6)].join('');
            const formatEndDate = [chosenDate.slice(0, 4), "-", chosenDate.slice(4, 6), "-", chosenDate.slice(6)].join('');
            setPeriod(prevState => {
                return {...prevState, startOrigin: formatStartDate, endOrigin: formatEndDate}
            });
        }
    }

    const deactivateDateFilter =  () => {
         dispatch(isFilterDateActive(false));
         dispatch(inputFilterDateFrom(""));
         dispatch(inputFilterDateTo(""));
         dispatch(setActivePage(1))
        const el = document.getElementsByClassName('LayoutSearchResults__btnDate');
        for (let i = 0; i < el.length; i++) {
            el[i].style.color = '#E34A4E';
            el[i].style.background = 'white';
        }
    }

    
    const closeModal = () => {
        setCalendarModal(false);
        setDeactivateBtn({});
        // if (!filters.includes('дата')) {
            const el = document.getElementsByClassName('LayoutSearchResults__btnDate');
            for (let i = 0; i < el.length; i++) {
                el[i].style.color = '#E34A4E';
                el[i].style.background = 'white';
            }
        // }
        dispatch(isFilterDateActive(false))
        dispatch(inputFilterDateFrom(""));
        dispatch(inputFilterDateTo(""));
    }


    const countPagination = () => {
    // Отрисовка пагинации
    if (pagesNumbers) {
        if (pagesNumbers <= 8) {
            let arr = [];
            for (let i = 0; i < pagesNumbers; i++) {
                arr[i] = i + 1;
            }
            allPages = arr.map(el => {
                return (
                    <p key={el} onClick={el !== "..." ? (event) => {choosePage(event)} : null} className={`${el !== "..." ? "PaginationNumber" : "PaginationDots"} ${el === 1 ? "PaginationNumber--defaultActive" : null}`}>
                        {el}
                    </p>
                )
            });
        } else {
            // сложная отрисовка пагинации относительно количества страниц, чтобы было видно начальные и последние страницы когда мы в центре, но количество элементов должно оставаться 8
                let arr = [];
                if (activePage < 5) {  

                for (let i = 0; i < 8; i++) {
                    // Когда кликнута страница меньше пятой, но страниц больше 8
                        if (i > 4) {
                            arr[i] = "...";
                            arr[i + 1] = pagesNumbers - 1;
                            arr[i + 2] = pagesNumbers;
                            break;
                        } else {
                            arr[i] = i + 1;
                        }
                    }
                     // Если активная страница равна 5
                } else if (activePage === 5) {
                    for (let i = 0; i < 8; i++) {
                        if (i === 0) {
                            arr[i] = "...";
                        } 
                        else if (i < 5) {
                            arr[i] = i + 1;
                        } else {
                            arr[i] = activePage + 1;
                            arr[i + 1] = "...";
                            arr[i + 2] = pagesNumbers;
                            break;
                        }
                    }
                }
                     // Если активная страница выше 5 но не выше чем максимум - 3
                else if (activePage > 5 && activePage <= pagesNumbers - 3) {
                            arr[0] = 1;
                            arr[1] = "...";
                            arr[2] = activePage - 2;
                            arr[3] = activePage - 1;
                            arr[4] = activePage;
                            arr[5] = activePage + 1;
                            arr[6] = "...";
                            arr[7] = pagesNumbers;
                }
                 // Если активная страница выше чем максимум - 3
                 else if (activePage > pagesNumbers - 3) {
                            arr[0] = 1;
                            arr[1] = 2
                            arr[2] = "...";
                            arr[3] = pagesNumbers - 4;
                            arr[4] = pagesNumbers - 3;
                            arr[5] = pagesNumbers - 2;
                            arr[6] = pagesNumbers - 1;
                            arr[7] = pagesNumbers;
        }
                allPages = arr.map((el, i) => {  
                    return (
                        <p key={el + i} onClick={el !== "..." ? (event) => {choosePage(event)} : null} className={`${el !== "..." ? "PaginationNumber" : "PaginationDots"} ${el === activePage ? "PaginationNumber--defaultActive" : null}`}>
                            {el}
                        </p> 
                    )
                });
            }
    }
}

countPagination();

    const choosePage = (event) => {
        dispatch(setActivePage(parseInt(event.target.textContent)));
        countPagination();
    }
    const colorActivePage = () => {
        const el = document.getElementsByClassName('PaginationNumber');
        for (let i = 0; i < el.length; i++) {
            el[i].style.fontSize = '14px';
            el[i].style.textDecoration = 'none';
            el[i].style.fontWeight = 'normal';
        }
        if (pagesNumbers <= 8) {
            el[activePage - 1].style.fontSize = '18px';
            el[activePage - 1].style.fontWeight = 'bold';
            el[activePage - 1].style.textDecoration = 'underline';
        } else {
            if (activePage < 4) {
                el[activePage - 1].style.fontSize = '18px';
                el[activePage - 1].style.fontWeight = 'bold';
                el[activePage - 1].style.textDecoration = 'underline';
            } else if (activePage === pagesNumbers) {
                el[6].style.fontSize = '18px';
                el[6].style.fontWeight = 'bold';
                el[6].style.textDecoration = 'underline';
            } else if (activePage > pagesNumbers - 3) {
                el[6 - (pagesNumbers - activePage)].style.fontSize = '18px';
                el[6 - (pagesNumbers - activePage)].style.fontWeight = 'bold';
                el[6 - (pagesNumbers - activePage)].style.textDecoration = 'underline';
            } else {
                el[3].style.fontSize = '18px';
                el[3].style.fontWeight = 'bold';
                el[3].style.textDecoration = 'underline';
            }
        }
    }

    const paginationRight = () => {
        if (activePage !== pagesNumbers) {
            dispatch(setActivePage(activePage + 1));
            // countPagination();
            // colorActivePage();
        }
    };
    const paginationLeft = () => {
        if (activePage !== 1) {
            dispatch(setActivePage(activePage - 1));
            // countPagination();
            // colorActivePage();
        }
    };



    tableView = (
    <>
        <ResultsTableWorker />
    </>);





    if (filters.length !== 0) {
        // Внизу страницы отображются активные фильтры, здесь они и рисуются
        allFilters = filters.map((el, i) => {
            return (
                <div className="LayoutSearchResults__filters" key={el}>
                    <div className="FilterElement">
                        {el}
                    </div>
                    {filters.length > 1 && i < filters.length - 1 ? <p className="FilterElement__plus">+</p> : null}
                </div>
            )
        })
    }
    useEffect(() => {
        const el = document.getElementsByClassName('PaginationNumber');
        if (el[0]) {
            colorActivePage();
        }
    }, [activePage]);

    useEffect(() => {
        dispatch(changePagination((activePage - 1) * 10));
    }, [activePage]);


    // const inputStartDateValue = (event) => {
    //     const value = event.target.value.replace(new RegExp("-", "g"), '');
    //     setPeriod(prevState => {
    //         return {...prevState, start: value, startOrigin: event.target.value}
    //     })
    // }
    // const inputEndDateValue = (event) => {
    //     const value = event.target.value.replace(new RegExp("-", "g"), '');
    //     setPeriod(prevState => {
    //         return {...prevState, end: value,endOrigin: event.target.value}
    //     })
    // }
    const acceptDatePeriod = () => {
        dispatch(setActivePage(1));
        dispatch(inputFilterDateFrom(period.start));
        dispatch(inputFilterDateTo(period.end));
        setCalendarModal(false);
    }
    const closeModalAccepted = () => {
        dispatch(setActivePage(1));
        setCalendarModal(false);
    }
    return (
            <LayoutSearchResults
                equipmentId={equipmentId}
                workerName={workerName}
                companyName={companyName}
                companyLogo={companyLogo}

                dateEngineClick={(event) => {chooseDateBtnSimple(event)}}
                datePeriodClick={(event) => {chooseDateBtnSimple(event)}}


                dateValueStart={dateStart}
                dateValueEnd={dateEnd}

                questionShow={hoverShowQuestion}
                questionHide={hoverHideQuestion}
                showQuestionModal={showQuestion}
                questionText={"Укажите регистрационный номер заявки для быстрого поиска"}
            

                isFilter={filters.length > 0}
                filters={allFilters}
                morePages={Math.ceil(count / 10) > 1}
                paginationClickLeft={paginationLeft}
                paginationClickRight={paginationRight}
                pagesNumbers={allPages}

            >
                {calendarModal ?
                    <ModalPeriod
                        closeModalAccepted={closeModalAccepted}
                        closeModal={closeModal}
                        acceptDatePeriod={acceptDatePeriod}
                        // inputStartDateValue={(event) => {inputStartDateValue(event)}}
                        // inputEndDateValue={(event) => {inputEndDateValue(event)}}
                        // dateValueStart={period.startOrigin}
                        // dateValueEnd={period.endOrigin}
                    />
               : null}
                {tableView}
            </LayoutSearchResults>
    )
}

export default WithLoader(SearchResultsPage, axios);