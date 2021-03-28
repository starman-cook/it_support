import React, {useState, useEffect} from 'react';
import './ModalPeriod.css';
// import RedButton from "../../ApplicationPageComponents/RedButton/RedButton";
// import 'react-calendar/dist/Calendar.css';



// Import Datepicker
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {
    inputFilterDateFrom, inputFilterDateTo, isFilterDateActive,
    setFirstCalendarDay,
    setSecondCalendarDay
} from "../../../Store/ApplicationsReducer/applicationsActions";
import Calendar from "react-calendar";

// Import Calendar
// import  Calendar  from 'react-calendar';







const ModalPeriod = (props) => {
    const dispatch = useDispatch();
    // constructor(props, context) {
    //     super(props, context);
    //
    //     this.state = {
    //         date: moment().startOf('year')
    //     }
    // }
    // const [state, setState] = useState({
    //     date: moment().startOf('year')
    // })

    // const [calendarsAmount, setCalendarAmount] = useState(1);
    // const [year, setYear] = useState(moment().year());
    // const [month, setMonth] = useState(moment().month());
    // const [day, setDay] = useState(moment().date());

    const [period, setPeriod] = useState({
        start: 'ДД/ММ/ГГ',
        startOrigin: 'ДД/ММ/ГГ',
        end: 'ДД/ММ/ГГ',
        endOrigin: 'ДД/ММ/ГГ'
    });

    // const [isModalMonth, setIsModalMonth] = useState(false);

    // const toggleModalMonth = () => {
    //     setIsModalMonth(!isModalMonth);
    // }

    // const [isModalYear, setIsModalYear] = useState(false);

    // const toggleModalYear = () => {
    //     setIsModalYear(!isModalYear);
    // }

    // const tableHead = (
    //     <div class="CalendarOne__weekdays-block">
    //         <p class="CalendarOne__weekdays">Понедельник</p>
    //         <p class="CalendarOne__weekdays">Вторник</p>
    //         <p class="CalendarOne__weekdays">Среда</p>
    //         <p class="CalendarOne__weekdays">Четверг</p>
    //         <p class="CalendarOne__weekdays">Пятница</p>
    //         <p class="CalendarOne__weekdays">Суббота</p>
    //         <p class="CalendarOne__weekdays">Воскресенье</p>
    //     </div>
    // )
    // const months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    //     "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
    // moment().set('month', 3);  // April
    // moment().set('date', 1);
    // alert(year + " " + month + " " + day)
    // let d = new Date();
    // d.setFullYear(2020);

    // let tableBody = [];
    // let firstDayOfTheMonth = moment().set('year', year).set('month', month).startOf('month').weekday();
    // firstDayOfTheMonth.day() % 6 === 0 ? firstDayOfTheMonth.add(1, 'day').day(1) : firstDayOfTheMonth;
    // alert(moment().set('month', month).daysInMonth())
    // const pickTheDay = (event) => {
    //     const el = document.getElementsByClassName("CalendarOne__column");
    //     alert(el);
    // }
    // let day2 = 1
    // for (let i = 0; i < moment().daysInMonth()/7 + 1; i++) {
    //     let stringTd = ""
    //     for (let j = 0; j < 7; j++) {
    //         if ( i === 0 && j < firstDayOfTheMonth - 1) {
    //             stringTd += `<td > </td>`;
    //         } else {
    //             if (moment().set('month', month).daysInMonth() >= day2) {
    //                 stringTd += `<td class="CalendarOne__column">${day2}</td>`;
    //                 day2++;
    //             }
    //         }
    //
    //     }
    //     tableBody.push(
    //         <tr className="CalendarOne__row" id={`Table${i}`} dangerouslySetInnerHTML={{__html: stringTd}}></tr>
    //     )
    // }

    // for (let i = 0; i < moment().daysInMonth()/7 + 1; i++) {
    //     // let stringTd = ""
    //     for (let j = 0; j < 7; j++) {
    //         if ( i === 0 && j < firstDayOfTheMonth - 1) {
    //             tableBody.push(null);
    //         } else {
    //             if (moment().set('month', month).daysInMonth() >= day2) {
    //                 tableBody.push(day2);
    //                 day2++;
    //             }
    //         }
    //
    //     }
        // tableBody.push(
        //     <tr className="CalendarOne__row" id={`Table${i}`} dangerouslySetInnerHTML={{__html: stringTd}}></tr>
        // )
    // }

    // const pickTheMonth = (i) => {
    //     setMonth(i);
    //     cancelSelection();
    //     cancelStateOfSelection();
    //     toggleModalMonth();
    // }

    // let allMonths = months.map((el, i) => {
    //    return (<p onClick={() => {pickTheMonth(i)}} className={"CalendarOne__month"}>{el}</p>)
    // });

    // получить возможные года
    // const years = [2019, 2020, 2021];

    // let allYears = years.map((el, i) => {
    //    return (
    //        <h3 onClick={() => {pickTheYear(i)}} className="ModalPeriod__year">{el}</h3>
    //    )
    // });
    // const pickTheYear = (i) => {
    //     setYear(years[i]);
    //     cancelSelection();
    //     cancelStateOfSelection();
    //     toggleModalYear();
    // }

    // const [range, setRange] = useState({
    //     first: 0,
    //     second: 0
    // })
    // const first = useSelector(state => state.applications.firstCalendarRangeDay);
    // const second = useSelector(state => state.applications.secondCalendarRangeDay);
    // const first = 1;
    // const second = 2;
// console.log(first + "   " + second);

    // useEffect(() => {
    //     const item = document.getElementsByClassName('CalendarOne__column');
    //     for (let i = 0; i < item.length; i++) {
    //         if (item[i].textContent === first.toString()) {
    //             item[i].style.color = 'white';
    //             item[i].style.background = '#4FC6E0';
    //             item[i].style.boxShadow = '0 0 0 1px #4FC6E0';
    //             item[i].style.borderRadius = '23px 0 0 23px';
    //             let formatMonth = month + 1;
    //             let formatDay = first;
    //             if (formatMonth < 10) {
    //                 formatMonth = "0" + formatMonth;
    //             }
    //             if(formatDay < 10) {
    //                 formatDay = "0" + formatDay;
    //             }
    //             setPeriod(prevState => {
    //                 return {...prevState, startOrigin: `${year}-${formatMonth}-${formatDay}`}
    //             })
    //         }else  if (item[i].textContent === second.toString()) {
    //             item[i].style.color = 'white';
    //             item[i].style.background = '#4FC6E0';
    //             item[i].style.boxShadow = '0 0 0 1px #4FC6E0';
    //             item[i].style.borderRadius = '0 23px 23px 0';
    //             let formatMonth = month + 1;
    //             let formatDay = second;
    //             if (formatMonth < 10) {
    //                 formatMonth = "0" + formatMonth;
    //             }
    //             if(formatDay < 10) {
    //                 formatDay = "0" + formatDay;
    //             }
    //             setPeriod(prevState => {
    //                 return {...prevState, endOrigin: `${year}-${formatMonth}-${formatDay}`}
    //             })
    //         }
    //         if (parseInt(item[i].textContent) > first && parseInt(item[i].textContent) < second) {
    //             item[i].style.color = 'white';
    //             item[i].style.background = '#4FC6E0';
    //             item[i].style.boxShadow = '0 0 0 1px #4FC6E0';
    //             item[i].style.borderRadius = '0';
    //         }
    //     }
    // }, [first, second]);

    // const pickTheDate = (event, el) => {
    //     cancelSelection();
    //     // event.target.style.color = 'white';
    //     // event.target.style.background = '#4FC6E0';
    //     console.log("EVENT TEXTCONTENT ", event.target.textContent)
    //     if (event.target.textContent === first.toString() || event.target.textContent === second.toString()) {
    //         event.target.style.color = '#4F4F4F';
    //         event.target.style.background = 'white';
    //         event.target.style.boxShadow = 'none';
    //         cancelStateOfSelection();
    //     }

        // if (el === range.first) {
        //     setRange(prevState => {
        //         return {...prevState,
        //             first: 0,
        //             second: 0
        //         }
        //     });
        // }
        // else {
        //     if (first === 0) {
        //         dispatch(setFirstCalendarDay(el));
        //     }
        //     else if (el < first) {
        //         const temp = first
        //         console.log(temp);
        //         dispatch(setSecondCalendarDay(temp));
        //         dispatch(setFirstCalendarDay(el));
        //     } else {
        //         dispatch(setSecondCalendarDay(el));
        //     }
            // for (let i = 0; i < item.length; i++) {
            //     if (item[i].textContent === first.toString()) {
            //         item[i].style.color = 'white';
            //         item[i].style.background = '#4FC6E0';
            //     }else  if (item[i].textContent === second.toString()) {
            //         item[i].style.color = 'white';
            //         item[i].style.background = '#4FC6E0';
            //     }

            // }

    //     }
    // }
    // const oneCalendar = (
    //     <div className="CalendarOne">
    //         <div className="CalendarOne__month-block">
    //             <p onClick={toggleModalMonth} className="CalendarOne__month">{months[month]}</p> <div className="CalendarOne__arrow" onClick={toggleModalMonth} />
    //             {isModalMonth ? <div className={"CalendarOne__month-modal"}>{allMonths}</div> : null}
    //         </div>
    //         {tableHead}
    //
    //         <div className="CalendarOne__table">
    //             {tableBody.map(el => {
    //                 return (
    //                     <div onClick={(event) => {pickTheDate(event, el)}} class="CalendarOne__column">{el}</div>
    //                 )
    //             })}
    //         </div>
    //     </div>
    // );

    // const cancelSelection = () => {
    //     const item = document.getElementsByClassName('CalendarOne__column');
    //     for (let i = 0; i < item.length; i++) {
    //         item[i].style.color = '#4F4F4F';
    //         item[i].style.background = 'white';
    //         item[i].style.boxShadow = 'none';
    //         item[i].style.borderRadius = 'none';
    //     }
    //
    // }
    // const cancelStateOfSelection = () => {
    //     dispatch(setFirstCalendarDay(0));
    //     dispatch(setSecondCalendarDay(0));
    //     setPeriod({
    //         start: 'ДД/ММ/ГГ',
    //         startOrigin: 'ДД/ММ/ГГ',
    //         end: 'ДД/ММ/ГГ',
    //         endOrigin: 'ДД/ММ/ГГ'
    //     })
    // }

    // const submitDates = () => {
    //     let formatMonth = month + 1;
    //     let formatDayFirst = first;
    //     let formatDaySecond = second;
    //     if (formatMonth < 10) {
    //         formatMonth = "0" + formatMonth;
    //     }
    //     if(formatDayFirst < 10) {
    //         formatDayFirst = "0" + formatDayFirst;
    //     }
    //     if(formatDaySecond < 10) {
    //         formatDaySecond = "0" + formatDaySecond;
    //     }
    //     dispatch(inputFilterDateFrom(`${year}${formatMonth}${formatDayFirst}`));
    //     dispatch(inputFilterDateTo(`${year}${formatMonth}${formatDaySecond}`));
    //     dispatch(isFilterDateActive(true));
    //     cancelSelection();
    //     cancelStateOfSelection();
    //     props.closeModal();
    // }

    const savePickChosenDates = (event) => {
        const from = moment(event[0]).format('YYYYMMDD')
        const to = moment(event[1]).format('YYYYMMDD')
        const fromOrigin = moment(event[0]).format('YYYY-MM-DD')
        const toOrigin = moment(event[1]).format('YYYY-MM-DD')
        setPeriod(prevState => {
            return {...prevState, start: from, end: to, startOrigin: fromOrigin, endOrigin: toOrigin}
        })

    }

    const submitDateRange = () => {
        dispatch(inputFilterDateFrom(period.start));
        dispatch(inputFilterDateTo(period.end));
        dispatch(isFilterDateActive(true));
        props.closeModal()
    }

    return (
        <div>


            <div onClick={props.closeModal} className="ModalPeriod__bg" />


            <div className="ModalPeriod">
                {/*<p className="ModalPeriod__textTopButton">фильтры по дате доступны с 05 мая 2019 года</p>*/}
                <div className="ModalPeriod__header">


                    {/*<div className="ModalPeriod__buttonsBlock">*/}
                        {/*<div onClick={() => {alert("Works")}} className="ModalPeriod__btnDate ModalPeriod__btnDate--left">Месяц</div>*/}
                        {/*<div onClick={() => {alert("Works")}} className="ModalPeriod__btnDate">Полугодие</div>*/}
                        {/*<div onClick={() => {alert("Works")}} className="ModalPeriod__btnDate ModalPeriod__btnDate--right">Год</div>*/}
                    {/*</div>*/}
                    {/*<div className="ModalPeriod__year-block">*/}
                    {/*    <h3 onClick={toggleModalYear} className="ModalPeriod__year">{year}</h3>*/}
                    {/*    <div className="ModalPeriod__year-arrow" onClick={toggleModalYear} />*/}
                    {/*    {isModalYear ? <div className="ModalPeriod__year-modal">{allYears}</div> : null}*/}
                    {/*</div>*/}
                    <div className="ModalPeriod__chooseDateBlock">
                        <div className="ModalPeriod__inputDate" >{period.startOrigin}</div>
                        <p className="ModalPeriod__dash">-</p>
                        <div className="ModalPeriod__inputDate" >{period.endOrigin}</div>
                    </div>


                    <button  className="RedButton--inCalendar" onClick={submitDateRange}>Показать заявки</button>
                </div>
                {/*{oneCalendar}*/}
    {/*///////////////////////*/}
    {/*            <div>*/}
    {/*                /!* Base calendar component *!/*/}
    {/*                <Calendar*/}
    {/*                    weekNumbers={true}*/}
    {/*                    size={2}*/}
    {/*                    startDate={state.date}*/}
    {/*                    date={state.date}*/}
    {/*                    endDate={state.date.clone().endOf('year')}*/}
    {/*                    mods={*/}
    {/*                        [*/}
    {/*                            {*/}
    {/*                                date: moment(),*/}
    {/*                                classNames: ['current'],*/}
    {/*                                component: ['day', 'month', 'week']*/}
    {/*                            }*/}
    {/*                        ]*/}
    {/*                    }*/}

    {/*                />*/}
    {/*            </div>*/}
    {/*            /////////////////////////////*/}
                <div>
                    <Calendar
                        className={"CalendarTest"}
                        selectRange={true}
                        maxDate={new Date()}
                        view ={"month"}
                        // maxDetail={"year"}
                        locale={"ru-RU"}
                        // nextLabel={""}
                        // next2Label={""}
                        // prevLabel={""}
                        // prev2Label={""}
                        returnValue={"range"}
                        showNavigation={true}
                        showDoubleView={true}
                        // minDate дата крайней последней заявки, чтобы ограничить выбор периода
                        // tileClassName !!!!!! class important!!!
                        tileClassName={"CalendarTest2"}
                        // navigationAriaLabel={"go up"}
                        onChange={(event) => {savePickChosenDates(event)}}
                        // activeStartDate={new Date()}
                        // value={new Date()}
                        // defaultValue={props.inputEndDateValue}
                    />

                </div>

                {/*<input className="ModalPeriod__input" onChange={props. } type={"date"}/>*/}
                {/*<input className="ModalPeriod__input" onChange={props.inputEndDateValue} type={"date"}/>*/}
                {/*<button onClick={props.acceptDatePeriod}>Принять</button>*/}
            </div>
        </div>
    )
}


export default ModalPeriod;