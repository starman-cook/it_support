import React, { useState, useEffect } from 'react';
import ButtonGrey from '../UI/ButtonGrey/ButtonGrey';
import './ModalDepartment.css';
import {changeDepartment, changeStatus, setActivePage} from "../../../Store/ApplicationsReducer/applicationsActions";
import {useDispatch, useSelector} from "react-redux";


const ModalDepartment = (props) => {
    const dispatch = useDispatch();
    const [inputState, setInputState] = useState({});

    const departments = useSelector(state => state.company.departments);
    const statusActiveFilters = useSelector(state => state.applications.data.filter.departament);
    useEffect(() => {
        let obj = {};
        departments.map(el => {
            if (statusActiveFilters.includes(el.code)) {
                obj[el.name] = el.code;
            }
        })
        setInputState(obj);
    }, []);
    const showDepartmentSearchResults = (event) => {
        event.preventDefault();
        let arr = [];
        Object.keys(inputState).map(el => {
            if (inputState[el]) {
                arr.push(inputState[el]);
            }
        dispatch(changeDepartment(arr));
        dispatch(setActivePage(1));
        props.close();
        });
    }

    const inputChange = (event, code) => {
        const name = event.target.name;
        if (!event.target.checked) {
            setInputState(prevState => {
                return {...prevState, [name]: null}
            });
        } else {
            setInputState(prevState => {
                return {...prevState, [name]: code}
            });
        }
        console.log(inputState);
    }
    let allDepartments = null;
    if (departments.length) {
        allDepartments = departments.map(el => {
           return   <label className="ModalDepartment__label">
                       <input checked={inputState[el.name]}  name={el.name} className="ModalDepartment__input" onChange={(event) => {inputChange(event, el.code)}} type="checkbox" />
                       <div  className="ModalDepartment__label--icon"/>
                       <p className="ModalDepartment__department">{el.name}</p>
                   </label>
        });
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
                        {allDepartments}
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