import React, { useState } from 'react';
import ButtonGrey from '../UI/ButtonGrey/ButtonGrey';
import './ModalDepartment.css';
import {changeDepartment, changeStatus, setActivePage} from "../../../Store/ApplicationsReducer/applicationsActions";
import {useDispatch} from "react-redux";


const ModalDepartment = (props) => {
    const dispatch = useDispatch();
    const [inputState, setInputState] = useState({
        onlineService: null,
        serviceDepartment: null,
        awaySpecialists: null,
        outStuffing: null,
        serverDepartment: null,
        administrative: null
    });
    const showDepartmentSearchResults = (event) => {
        event.preventDefault();
        let arr = [];
        Object.keys(inputState).map(el => {
            if (inputState[el]) {
                arr.push(el === "onlineService" ? "Удаленная поддержка" : el === "serviceDepartment" ? "Сервисный отдел" : el === "awaySpecialists" ? "Выездные специалисты" : el === "outStuffing" ? "Аутстаффинг" : el === "serverDepartment" ? "Серверный отдел" : el === "administrative" ? "Административно-управленческий отдел" : null);
            }
            dispatch(changeDepartment(arr));
            dispatch(setActivePage(1));
        })
    }
    const inputChange = (event) => {
        const {name, value} = event.target;
        if (!event.target.checked) {
            setInputState(prevState => {
                return {...prevState, [name]: null}
            });
        } else {
            setInputState(prevState => {
                return {...prevState, [name]: value}
            });
        }
    }

    return (
        <>
        <div onClick={props.close} className="ModalDepartment__bg" />
            <div className="ModalDepartment">
                <div className="ModalDepartment__header">
                    <p className="ModalDepartment__header--text">Показывать только:</p>
                </div>
                <div className="ModalDepartment__content">
                    <form className="ModalDepartment__form" onSubmit={(event) => {showDepartmentSearchResults(event)}}>
                        <label className="ModalDepartment__label">
                            <input name="onlineService" className="ModalDepartment__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalDepartment__label--icon"/>
                            <p className="ModalDepartment__department">Удаленная поддержка</p>
                        </label>

                        <label className="ModalDepartment__label">
                            <input name="serviceDepartment" className="ModalDepartment__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalDepartment__label--icon"/>
                            <p className="ModalDepartment__department">Сервисный отдел</p>
                        </label>

                        <label className="ModalDepartment__label">
                            <input name="awaySpecialists" className="ModalDepartment__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalDepartment__label--icon"/>
                            <p className="ModalDepartment__department">Выездные специалисты</p>
                        </label>

                        <label className="ModalDepartment__label">
                            <input name="outStuffing" className="ModalDepartment__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalDepartment__label--icon"/>
                            <p className="ModalDepartment__department">Аутстаффинг</p>
                        </label>

                        <label className="ModalDepartment__label">
                            <input name="serverDepartment" className="ModalDepartment__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalDepartment__label--icon"/>
                            <p className="ModalDepartment__department">Серверный отдел</p>
                        </label>

                        <label className="ModalDepartment__label">
                            <input name="administrative" className="ModalDepartment__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalDepartment__label--icon"/>
                            <p className="ModalDepartment__department">Административно-управленческий отдел</p>
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


export default ModalDepartment;