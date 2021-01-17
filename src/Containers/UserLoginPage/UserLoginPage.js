import React, { useRef, useState } from 'react';
import AuthenticationModal from '../../Components/UserLoginPageComponents/AuthenticationModal/AuthenticationModal';
import HelperInfo from '../../Components/UserLoginPageComponents/HelperInfo/HelperInfo';
import LoginForm from '../../Components/UserLoginPageComponents/LoginForm/LoginForm';
import PhoneInput from '../../Components/UserLoginPageComponents/PhoneInput/PhoneInput';


const UserLoginPage = () => {
    const [phoneCode, setPhoneCode] = useState("");
    const [phoneA, setPhoneA] = useState("");
    const [phoneB, setPhoneB] = useState("");
    const [phoneC, setPhoneC] = useState("");

    // const refPhone = useRef();

    const status = "phone";
    let grey = false;
    let loginContent;
    let question;
    let link;
    let textLink;
    let contacts;
    // const MAX_LENGTH = 1;


    const handleChange = e => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        if (value.length >= maxLength) {
          if (parseInt(fieldIndex, 10) < 4) {
            const nextSibling = document.querySelector(
              `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
            );
          
            if (nextSibling !== null) {
              nextSibling.focus();
              
            }
          }
        }
        if (value.length === 0) {
            const prevSibling = document.querySelector(
                `input[name=ssn-${parseInt(fieldIndex, 10) - 1}]`
              );
            
              if (prevSibling !== null) {
                prevSibling.focus();
              }
        }
        if (name === "ssn-1") {
            setPhoneCode(e.target.value);
        } else if (name === "ssn-2") {
            setPhoneA(e.target.value);
        } else if (name === "ssn-3") {
            setPhoneB(e.target.value);
        } else if (name === "ssn-4") {
            setPhoneC(e.target.value);
        }
      }

    if (status == "phone") {
        grey = true;
        question = "У вас возникли сложности?";
        link = "#";
        textLink = "Оставьте заявку в чат-боте WatsApp";
        contacts = "или позвоните на +7 707 390 11 12, и мы что-нибудь придумаем.";
        loginContent = (
            <PhoneInput
                // error
                // refPhone={refPhone}
                // phoneModel={"+7 444"}
                // activateInput={activateInput}
                // phoneOnChange={(event) => {phoneOnChangeHandler(event)}}
                buttonName={"запросить SMS-пароль"}
                buttonWidth={"303"}
            >
                <div className="PhoneInput__phoneBlock">
                    <p className="PhoneInput__phoneText">+7 (</p>
                    <input
                        placeholder="---"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--long"
                        type="text"
                        name="ssn-1"
                        maxLength={3}
                        onChange={handleChange} />
                    <p className="PhoneInput__phoneText">) </p>
                    <input
                        placeholder="---"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--long"
                        type="text"
                        name="ssn-2"
                        maxLength={3}
                        onChange={handleChange} />
                    <p className="PhoneInput__phoneText"> - </p>
                    <input
                        placeholder="--"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--short"
                        type="text"
                        name="ssn-3"
                        maxLength={2}
                        onChange={handleChange} />
                    <p className="PhoneInput__phoneText"> - </p>
                    <input
                        placeholder="--"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--short"
                        type="text"
                        name="ssn-4"
                        maxLength={2}
                        onChange={handleChange} />
                </div>
            </PhoneInput>
        )
    }
    if (status == "login") {
        question = "Не помните данные для входа?";
        link = "#";
        textLink = "Оставьте заявку в чат-боте WatsApp";
        contacts = "или позвоните на +7 707 390 11 12, и мы восстановим ваш логин и пароль.";
        loginContent = (
            <LoginForm 
                title={"Личный кабинет клиента"}
                // submit
                // loginOnChange
                // passwordOnChange
                // checkOnChange
                errorUsername={true}
                errorPassword={true}
                buttonName={"войти"}
                buttonWidth={"142"}
                // refCheckbox
            />
        )
    }

    return (
        <div>
            <AuthenticationModal>
                {loginContent}
            </AuthenticationModal>
            <HelperInfo 
                question={question}
                link={link}
                textLink={textLink}
                contacts={contacts}
                grey={grey}
                instagram={"#"}
                facebook={"#"}
                linkedin={"#"}
                youtube={"#"}
            />
        </div>
    )
}

export default UserLoginPage;