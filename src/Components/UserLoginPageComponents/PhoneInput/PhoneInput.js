import React from 'react';
import Button from '../Button/Button';
import './PhoneInput.css';

const PhoneInput = (props) => {
    return (
        <div className="PhoneInput">
            {props.error ? <p className="PhoneInput__title">Упс...</p> : <p className="PhoneInput__title">SMS-верификация</p>}
            {props.error ? <p className="PhoneInput__text">Судя по всему такого номера нет в нашей базе, возможно мы еще не внесли его или вы ошиблись, проверьте и попробуйте снова.</p> : <p className="PhoneInput__text">Для входа в личный кабинет введите номер мобильного телефона и если он есть в нашей базе, мы пришлём одноразовый SMS-пароль</p>}
            <div className="PhoneInput__inputs">
                {props.children}
            </div>
            <Button
                clicked={props.clicked}
                name={props.buttonName}
                width={props.buttonWidth}
            />
        </div>
    )
}

export default PhoneInput;