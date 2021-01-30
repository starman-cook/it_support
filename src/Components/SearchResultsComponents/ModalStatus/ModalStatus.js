import React, { useState } from 'react';
import ButtonGrey from '../UI/ButtonGrey/ButtonGrey';
import './ModalStatus.css';


const ModalStatus = (props) => {

    const [inputState, setInputState] = useState({
        planned: null,
        inProgress: null,
        completed: null,
        canceled: null
    });

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
        <div onClick={props.close} className="ModalStatus__bg" />
            <div className="ModalStatus">
                <div className="ModalStatus__header">
                    <p className="ModalStatus__header--text">Показывать только:</p>
                </div>
                <div className="ModalStatus__content">
                    <form className="ModalStatus__form">
                        <label className="ModalStatus__label">
                            <input name="planned" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalStatus__label--icon"/>
                            <p className="ModalStatus__status ModalStatus__status--planned">запланировано</p>
                        </label>

                        <label className="ModalStatus__label">
                            <input name="inProgress" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalStatus__label--icon"/>
                            <p className="ModalStatus__status ModalStatus__status--inProgress">в работе</p>
                        </label>

                        <label className="ModalStatus__label">
                            <input name="completed" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
                            <div  className="ModalStatus__label--icon"/>
                            <p className="ModalStatus__status ModalStatus__status--completed">завершено</p>
                        </label>

                        <label className="ModalStatus__label">
                            <input name="canceled" className="ModalStatus__input" onChange={(event) => {inputChange(event)}} type="checkbox" />
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