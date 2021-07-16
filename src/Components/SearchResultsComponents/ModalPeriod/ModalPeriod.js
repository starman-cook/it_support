import React, {useState, useEffect} from 'react';
import './ModalPeriod.css';
import moment from 'moment';
import {useDispatch} from "react-redux";
import {
    inputFilterDateFrom, inputFilterDateTo, isFilterDateActive, setActivePage
} from "../../../Store/ApplicationsReducer/applicationsActions";
import Calendar from "react-calendar";








const ModalPeriod = (props) => {
    const dispatch = useDispatch();
    const [period, setPeriod] = useState({
        start: 'ДД/ММ/ГГ',
        startOrigin: 'ДД/ММ/ГГ',
        end: 'ДД/ММ/ГГ',
        endOrigin: 'ДД/ММ/ГГ'
    });

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
        dispatch(setActivePage(1));
        setTimeout(() => {
            props.closeModalAccepted()
        }, 1000)
    }

    return (
        <div>


            <div onClick={props.closeModal} className="ModalPeriod__bg" />


            <div className="ModalPeriod">
                <div className="ModalPeriod__header">
                    <div className="ModalPeriod__chooseDateBlock">
                        <div className="ModalPeriod__inputDate" >{period.startOrigin}</div>
                        <p className="ModalPeriod__dash">-</p>
                        <div className="ModalPeriod__inputDate" >{period.endOrigin}</div>
                    </div>


                    <button  className="RedButton--inCalendar" onClick={submitDateRange}>Показать заявки</button>
                </div>

                <div>
                    <Calendar
                        className={"CalendarTest"}
                        selectRange={true}
                        maxDate={new Date()}
                        view ={"month"}
                        locale={"ru-RU"}
                        returnValue={"range"}
                        showNavigation={true}
                        showDoubleView={true}
                        tileClassName={"CalendarTest2"}
                        onChange={(event) => {savePickChosenDates(event)}}
                    />

                </div>
            </div>
        </div>
    )
}


export default ModalPeriod;