import React from 'react';
import Button from '../Button/Button';
import './SmsInput.css';

const SmsInput = (props) => {
    return (
        <div className="SmsInput">
           <p className="SmsInput__title">SMS-верификация</p>
            <p className="SmsInput__text">Уважаемый пользователь,
                                        на ваш номер <span className="SmsInput__text--bold">{props.phone}</span>
                                        отправлен одноразовый SMS-пароль
            </p>
            <div className="SmsInput__inputs">
                {props.children}
            </div>
            {props.wrongPassword ? <p className="SmsInput__text--red">неверный пароль</p> : null}
            {props.error ? <Button 
                name={props.buttonName}
                width={props.ButtonWidth}
                clicked={props.clicked}
            /> : <p className="SmsInput__text--small">запросить SMS-пароль  повторно можно будет через {props.time} секунд</p>}
        </div>
    )
}

export default SmsInput;