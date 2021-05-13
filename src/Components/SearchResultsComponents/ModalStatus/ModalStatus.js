import React, { useState, useEffect } from 'react';
import ButtonGrey from '../UI/ButtonGrey/ButtonGrey';
import './ModalStatus.css';
import {useDispatch, useSelector} from "react-redux";
import {changeStatus, setActivePage} from "../../../Store/ApplicationsReducer/applicationsActions";


const ModalStatus = (props) => {
    const dispatch = useDispatch();
    const statusActiveFilters = useSelector(state => state.applications.data.filter.status);

    useEffect(() => {
        setInputState({
            planned: statusActiveFilters.includes("Запланировано"),
            inProgress: statusActiveFilters.includes("В работе"),
            completed: statusActiveFilters.includes("Завершено"),
            canceled: statusActiveFilters.includes("Отменено")
        });
    }, []);
    const [inputState, setInputState] = useState({
        planned: "",
        inProgress: "",
        completed: "",
        canceled: ""
    });

    const inputChange = (event) => {
        const {name, value} = event.target;
        if (!event.target.checked) {
            setInputState(prevState => {
                return {...prevState, [name]: ""}
            });
        } else {
            setInputState(prevState => {
                return {...prevState, [name]: value}
            });
        }
    }
    // useEffect(() => {
    //     let arr = [];
    //     Object.keys(inputState).map(el => {
    //         if (inputState[el]) {
    //             arr.push(el === "planned" ? "Запланировано" : el === "inProgress" ? "В работе" : el === "completed" ? "Завершено" : el === "canceled" ? "Отменено" : null);
    //         }
    //         dispatch(changeStatus(arr));
    //         dispatch(setActivePage(1));
    //     })
    // }, [inputState]);
    const showStatusSearchResults = (event) => {
        event.preventDefault();
        let arr = [];
        Object.keys(inputState).forEach(el => {
            if (inputState[el]) {
                arr.push(el === "planned" ? "Запланировано" : el === "inProgress" ? "В работе" : el === "completed" ? "Завершено" : el === "canceled" ? "Отменено" : null);
            }
            dispatch(changeStatus(arr));
            dispatch(setActivePage(1));
            props.close();
        })
    }

    return (
        <>
        <div onClick={props.close} className="ModalStatus__bg" />
            <div className="ModalStatus">
                <div className="ModalStatus__header">
                    <p className="ModalStatus__header--text">Показывать только:</p>
                </div>
                <div className="ModalStatus__content">
                    <form className="ModalStatus__form" onSubmit={(event) => {showStatusSearchResults(event)}}>
                        <label className="ModalStatus__label">
                            <input checked={inputState.planned} name="planned" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalStatus__label--icon"/>
                            <p className="ModalStatus__status ModalStatus__status--planned">запланировано</p>
                        </label>

                        <label className="ModalStatus__label">
                            <input checked={inputState.inProgress} name="inProgress" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalStatus__label--icon"/>
                            <p className="ModalStatus__status ModalStatus__status--inProgress">в работе</p>
                        </label>

                        <label className="ModalStatus__label">
                            <input checked={inputState.completed} name="completed" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalStatus__label--icon"/>
                            <p className="ModalStatus__status ModalStatus__status--completed">завершено</p>
                        </label>

                        <label className="ModalStatus__label">
                            <input checked={inputState.canceled} name="canceled" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalStatus__label--icon"/>
                            <p className="ModalStatus__status ModalStatus__status--canceled">отменено</p>
                        </label>

                        <ButtonGrey 
                            name="показать"
                        />
                    </form>
                </div>
            </div>
            </>
    )
}


export default ModalStatus;