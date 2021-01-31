import React, { useState } from 'react';
import './ModalWorker.css';


const ModalWorker = (props) => {

   const [inputState, setInputState] = useState('');
   const [showResults, setShowResults] = useState(false);
   const [resultValue, setResultValue] = useState(''); 

   // введенные данные с каждым кликом отправляют запрос и получают данные из списка сотрудников компании
    const inputChange = (event) => {
        const {name, value} = event.target;
        setInputState({name: value});
        setShowResults(true);
    }
    const hideResults = () => {
        setShowResults(false);
    };
    const getResultValue = (event) => {
        setResultValue(event.target.innerText);
    }
    const workers = [
        {name: "Some name"},{name: "Some name"},{name: "Some name"},{name: "Some name"}
    ]
    let allWorkerSearchResults;

    if (workers.length != 0) {
        allWorkerSearchResults = (<div className="ModalWorker__results">
            {workers.map((el, i) => {
                return <p key={i} onClick={(event) => {getResultValue(event)}} className="ModalWorker__resultsItem">{el.name}</p>
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