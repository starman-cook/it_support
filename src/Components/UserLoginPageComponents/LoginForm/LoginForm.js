import React from 'react';
import Button from '../Button/Button';
import './LoginForm.css';

const LoginForm = (props) => {
    return (
        <div className="LoginForm">
            <h3 className="LoginForm__title">{props.title}</h3>

            <form onSubmit={props.submit}>
                <div className="LoginForm__formContent">
                    <input placeholder="логин" name="username" className="LoginForm__input" onChange={props.loginOnChange} type="text" />
                    <input placeholder="пароль" name="password" className="LoginForm__input LoginForm__input--pushDown" onChange={props.passwordOnChange} type="password" />
                    <Button 
                        name={props.buttonName}
                        width={props.buttonWidth}
                    />
                    <label name="remebmer" for="remember">
                        <input ref={props.refCheckbox} className="LoginForm__checkbox" id="remember" name="remember" onChange={props.checkOnChange} type="checkbox" />
                        <p className="LoginForm__checkbox--text">Запомнить меня</p>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;