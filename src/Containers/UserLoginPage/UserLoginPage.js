import React, { useRef, useState } from 'react';
import AuthenticationModal from '../../Components/UserLoginPageComponents/AuthenticationModal/AuthenticationModal';
import HelperInfo from '../../Components/UserLoginPageComponents/HelperInfo/HelperInfo';
import LoginForm from '../../Components/UserLoginPageComponents/LoginForm/LoginForm';
import PhoneInput from '../../Components/UserLoginPageComponents/PhoneInput/PhoneInput';
import SmsInput from '../../Components/UserLoginPageComponents/SmsInput/SmsInput';


const UserLoginPage = () => {
    const [phoneCode, setPhoneCode] = useState("");
    const [phoneA, setPhoneA] = useState("");
    const [phoneB, setPhoneB] = useState("");
    const [phoneC, setPhoneC] = useState("");

    const [sms1, setSms1] = useState("");
    const [sms2, setSms2] = useState("");
    const [sms3, setSms3] = useState("");
    const [sms4, setSms4] = useState("");


    // const refPhone = useRef();

    const status = "sms";
    let grey = false;
    let loginContent;
    let question;
    let link;
    let textLink;
    let contacts;
    // const MAX_LENGTH = 1;


    const handleChangePhone = (e) => {
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

      const handleChangeSms = (e) => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        if (value.length >= maxLength) {
          if (parseInt(fieldIndex, 10) < 4) {
            const nextSibling = document.querySelector(
              `input[name=smsn-${parseInt(fieldIndex, 10) + 1}]`
            );
          
            if (nextSibling !== null) {
              nextSibling.focus();
              
            }
          }
        }
        if (value.length === 0) {
            const prevSibling = document.querySelector(
                `input[name=smsn-${parseInt(fieldIndex, 10) - 1}]`
              );
            
              if (prevSibling !== null) {
                prevSibling.focus();
              }
        }
        if (name === "smsn-1") {
            setSms1(e.target.value);
        } else if (name === "smsn-2") {
            setSms2(e.target.value);
        } else if (name === "smsn-3") {
            setSms3(e.target.value);
        } else if (name === "smsn-4") {
            setSms4(e.target.value);
        }
      }

    if (status === "sms") {
        grey = true;
        question = "У вас возникли сложности?";
        link = "#";
        textLink = "Оставьте заявку в чат-боте WatsApp";
        contacts = "или позвоните на +7 707 390 11 12, и мы что-нибудь придумаем.";
        loginContent = (
            <SmsInput
                time={"15"}
                wrongPassword={false}
                error={false}
                buttonName={"запросить SMS повторно"}
                buttonWidth={"303"}
                phone={`+7 ${phoneCode} *** ** ${phoneC}`}
            >
                  <div className="SmsInput__phoneBlock">
                    <input
                        placeholder="_"
                        className="SmsInput__inputPiece"
                        type="text"
                        name="smsn-1"
                        maxLength={1}
                        onChange={handleChangeSms} />
                    <input
                        placeholder="_"
                        className="SmsInput__inputPiece"
                        type="text"
                        name="smsn-2"
                        maxLength={1}
                        onChange={handleChangeSms} />
                    <input
                        placeholder="_"
                        className="SmsInput__inputPiece"
                        type="text"
                        name="smsn-3"
                        maxLength={1}
                        onChange={handleChangeSms} />
                    <input
                        placeholder="_"
                        className="SmsInput__inputPiece"
                        type="text"
                        name="smsn-4"
                        maxLength={1}
                        onChange={handleChangeSms} />
                </div>
            </SmsInput>
        )
    }
    if (status === "phone") {
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
                        onChange={handleChangePhone} />
                    <p className="PhoneInput__phoneText">) </p>
                    <input
                        placeholder="---"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--long"
                        type="text"
                        name="ssn-2"
                        maxLength={3}
                        onChange={handleChangePhone} />
                    <p className="PhoneInput__phoneText"> - </p>
                    <input
                        placeholder="--"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--short"
                        type="text"
                        name="ssn-3"
                        maxLength={2}
                        onChange={handleChangePhone} />
                    <p className="PhoneInput__phoneText"> - </p>
                    <input
                        placeholder="--"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--short"
                        type="text"
                        name="ssn-4"
                        maxLength={2}
                        onChange={handleChangePhone} />
                </div>
            </PhoneInput>
        )
    }
    if (status === "login") {
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