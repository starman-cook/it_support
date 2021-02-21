import React from 'react';
import Button from '../Button/Button';
import './LoginForm.css';

const LoginForm = (props) => {

    return (
        <div className="LoginForm">
            <h3 className="LoginForm__title">{props.title}</h3>

            <form onSubmit={props.submit}>
                <div className="LoginForm__formContent">
                    <input style={props.errorUsername ? {border: "1px solid #E34A4E"} : null} placeholder="логин" name="username" className="LoginForm__input" onChange={props.loginOnChange} type="text" />
                    <div className="LoginForm__errorFrame">
                        {props.errorUsername ? <p className="LoginForm__errorText">Неправильный логин. Проверьте написание и попробуйте еще раз.</p> : null}
                    </div>
                    <input style={props.errorPassword ? {border: "1px solid #E34A4E"} : null} placeholder="пароль" name="password" className="LoginForm__input" onChange={props.passwordOnChange} type="password" />
                    <div className="LoginForm__errorFrame">
                        {props.errorPassword ? <p className="LoginForm__errorText">Неправильный пароль. Проверьте раскладку и попробуйте еще раз.</p> : null}
                    </div>
                    <Button 
                        class="LoginForm__input--pushUp"
                        name={props.buttonName}
                        width={props.buttonWidth}
                    />
                    <label name="remember" for="remember">
                        <input ref={props.refCheckbox} className="LoginForm__checkbox" id="remember" name="remember" onChange={props.checkOnChange} type="checkbox" />
                        <p className="LoginForm__checkbox--text">Запомнить меня</p>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;