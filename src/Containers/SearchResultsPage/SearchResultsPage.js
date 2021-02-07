import React, { useState, useEffect } from 'react';
import LayoutSearchResults from '../../Components/SearchResultsComponents/LayoutSearchResults/LayoutSearchResults';
import ResultsTableWorker from '../../Components/SearchResultsComponents/ResultsTableWorker/ResultsTableWorker';
import './SearchResultsPage.css';
import {useDispatch, useSelector} from "react-redux";
import {
    changePagination,
    inputFilterDateFrom,
    inputFilterDateTo, setActivePage
} from "../../Store/ApplicationsReducer/applicationsActions";
import moment from 'moment';

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    let filtersCheck = {
        isFilterStatus: useSelector(state => state.applications.data['filter'].status.length > 0) ? "статус" : null,
        isFilterDepartment: useSelector(state => state.applications.data['filter'].departament.length > 0) ? "отдел" : null,
        isFilterWorker: useSelector(state => state.applications.data['filter'].employee.trim() !== '') ? "сотрудник" : null,
        isFilterNumber: useSelector(state => state.applications.data['filter'].number !== '') ? "id заявки" : null
    }


    const [filters, setFilters] = useState([]); // после выбора фильтров они попадают в массив
    useEffect(() => {
        let arr = [];
        Object.keys(filtersCheck).map(el => {
            if (filtersCheck[el]) {
                arr.push(filtersCheck[el]);
            }
            setFilters(arr);
        })
    }, [filtersCheck]);
    const isFilter = filters.length > 0;
    const dateStart = 'ДД/ММ/ГГ';
    const dateEnd = 'ДД/ММ/ГГ';
    const  equipmentId = "175674";
    const workerName = "Сид Вишес";
    const companyName = "ТОО 'Секс Пистоллз'";
    const companyLogo = "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg";
    const [showQuestion, setShowQuestion] = useState(false);
    const [calendarModal, setCalendarModal] = useState(false);

    
    
    // const [activePage, setActivePage] = useState(1);
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

    const chooseDateBtnSimple = (event) => {
        const el = document.getElementsByClassName('LayoutSearchResults__btnDate');
        for (let i = 0; i < el.length; i++) {
            el[i].style.color = '#E34A4E';
            el[i].style.background = 'white';
        }
        event.target.style.color = 'white';
        event.target.style.background = '#E34A4E';
        // let date = new Date();
        // let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // if (month < 10) {
        //     month = "0" + month;
        // }
        // let day = date.getDate()
        // if (day < 10) {
        //     day = "0" + day;
        // }
        // const today = `${year}${month}${day}`
        if (event.target.textContent === 'Период') {
            setCalendarModal(true);
        } else {
            let today = moment().format("YYYYMMDD");
            let chosenDate;
            dispatch(changePagination(0));
            dispatch(setActivePage(1));
            switch (event.target.textContent) {
                case "Сегодня":
                    chosenDate = today;
                    break;
                case "Вчера":
                    chosenDate = moment().subtract(1, 'days').format("YYYYMMDD");
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
        }
    }

    
    const closeModal = () => {
        setCalendarModal(false);
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
        // const el = document.getElementsByClassName('PaginationNumber');
        // for (let i = 0; i < el.length; i++) {
        //     el[i].style.fontSize = '14px';
        //     el[i].style.textDecoration = 'none';
        //     el[i].style.fontWeight = 'normal';
        // }
        // event.target.style.fontSize = '18px';
        // event.target.style.fontWeight = 'bold';
        // event.target.style.textDecoration = 'underline';

        dispatch(setActivePage(parseInt(event.target.textContent)));
        countPagination();
        // colorActivePage();
    }
    const colorActivePage = () => {
        const el = document.getElementsByClassName('PaginationNumber');
        for (let i = 0; i < el.length; i++) {
            el[i].style.fontSize = '14px';
            el[i].style.textDecoration = 'none';
            el[i].style.fontWeight = 'normal';
        }
        el[activePage - 1].style.fontSize = '18px';
        el[activePage - 1].style.fontWeight = 'bold';
        el[activePage - 1].style.textDecoration = 'underline';
        // console.log(el[0]);
    }

    const paginationRight = () => {
        if (activePage !== pagesNumbers) {
            dispatch(setActivePage(activePage + 1));
            countPagination();
            // colorActivePage();
        }
    };
    const paginationLeft = () => {
        if (activePage !== 1) {
            dispatch(setActivePage(activePage - 1));
            countPagination();
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
            

                isFilter={isFilter}
                filters={allFilters}
                morePages={true}
                paginationClickLeft={paginationLeft}
                paginationClickRight={paginationRight}
                pagesNumbers={allPages}

            >
                {calendarModal ? 
                <div>
                    <div onClick={closeModal} className="Modal__bg" />
                    <div className="Modal">
                        <button>BTN</button>
                        MODAL
                    </div>
                </div>: null}
                {tableView}
            </LayoutSearchResults>
    )
}

export default SearchResultsPage;