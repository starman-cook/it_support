import React, { useState, useEffect } from 'react';
import './ModalWorker.css';
import {useDispatch, useSelector} from "react-redux";
import {changeEmployee, setActivePage} from "../../../Store/ApplicationsReducer/applicationsActions";


const ModalWorker = (props) => {
   const dispatch = useDispatch();
   const [inputState, setInputState] = useState('');
   const [showResults, setShowResults] = useState(false);

   // введенные данные с каждым кликом отправляют запрос и получают данные из списка сотрудников компании
    const inputChange = (event) => {
        setInputState(event.target.value);
        setShowResults(true);
    }
    const hideResults = () => {
        setShowResults(false);
    };
    const getResultValue = (event, code) => {
        dispatch(changeEmployee(code));
        dispatch(setActivePage(1));
    }

    const workers = useSelector(state => state.company.employees);
    const [filtered, setFiltered] = useState([]);
    let allWorkerSearchResults;
    useEffect(() => {
        setFiltered(workers.filter(el => el.name.includes(inputState)));
    }, [inputState]);

    if (filtered.length !== 0) {
        allWorkerSearchResults = (<div className="ModalWorker__results">
            {filtered.map((el, i) => {
                return <p key={i} onClick={(event) => {getResultValue(event, el.code)}} className="ModalWorker__resultsItem">{el.name}</p>
             })}
        </div>
        )}

    return (
        <>
        <div onClick={props.close} className="ModalWorker__bg" />
            <div className="ModalWorker">
                <input onChange={(event) => {inputChange(event)}} className="ModalWorker__input" type="text" placeholder="Введите имя сотрудника" />
                <div className="ModalWorker__arrowBtn" onClick={hideResults} />
                {showResults ? allWorkerSearchResults : null}
            </div>
        </>
    )
}


export default ModalWorker;