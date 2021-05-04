import React, { useRef, useState, useEffect } from 'react';
import AuthenticationModal from '../../Components/UserLoginPageComponents/AuthenticationModal/AuthenticationModal';
import HelperInfo from '../../Components/UserLoginPageComponents/HelperInfo/HelperInfo';
import LoginForm from '../../Components/UserLoginPageComponents/LoginForm/LoginForm';
import PhoneInput from '../../Components/UserLoginPageComponents/PhoneInput/PhoneInput';
import SmsInput from '../../Components/UserLoginPageComponents/SmsInput/SmsInput';
import {useDispatch, useSelector} from "react-redux";
import {loginUser, saveUser, sendPhone, sendSms, setLoginStatus} from "../../Store/UsersReducer/usersActions";
import axios from "../../axiosApi";
import WithLoader from '../../hoc/WithLoader/WithLoader';
import {clearMyInterval} from "../../Store/ApplicationsReducer/applicationsActions";

const UserLoginPage = (props) => {
    const dispatch = useDispatch();
    // const id = "1267-02-00020";
    // const id = "1240-02-00044";
    const id = props.match.params.id;
    useEffect(() => {
        dispatch(clearMyInterval())
        if (id) {
            dispatch(setLoginStatus("phone"));
        }
    }, [id]);
    console.log("ID SAMPLE: 1240-02-00044")
    const [phoneCode, setPhoneCode] = useState("");
    const [phoneA, setPhoneA] = useState("");
    const [phoneB, setPhoneB] = useState("");
    const [phoneC, setPhoneC] = useState("");

    const [sms1, setSms1] = useState("");
    const [sms2, setSms2] = useState("");
    const [sms3, setSms3] = useState("");
    const [sms4, setSms4] = useState("");

    useEffect(() => {
        if (sms1 && sms2 && sms3 && sms4) {
            const smsAndIdNumber = {
                _id: id,
                sms: `${sms1}${sms2}${sms3}${sms4}`
            }
            dispatch(sendSms(smsAndIdNumber));
        }
    }, [sms1, sms2,  sms3, sms4]);

    useEffect(() => {
        localStorage.clear();
        if (id) {
            dispatch(saveUser(id));
        }
    }, [dispatch]);

    const phoneError = useSelector(state => state.users.phoneLoginError);
    const smsError = useSelector(state => state.users.smsLoginError);

    const sendPhoneByPressEnter = async (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            let phoneNumber = `+7${phoneCode}${phoneA}${phoneB}${phoneC}`;
            await dispatch(sendPhone({phone: phoneNumber}, id));
        }
    }

    const sendPhoneHandler = async () => {
        let phoneNumber = `+7${phoneCode}${phoneA}${phoneB}${phoneC}`;
        await dispatch(sendPhone({phone: phoneNumber}, id));
    }
    const resendSmsHandler = () => {
        sendPhoneHandler();
        setSms1('');
        setSms2('');
        setSms3('');
        setSms4('');
    }

    // const refPhone = useRef();

    const status = useSelector(state => state.users.loginStatus);
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
                wrongPassword={smsError}
                error={smsError}
                buttonName={"запросить SMS повторно"}
                buttonWidth={"303"}
                phone={`+7 ${phoneCode} *** ** ${phoneC}`}
                clicked={(event) => {resendSmsHandler(event)}}
            >
                  <div className="SmsInput__phoneBlock">
                    <input
                        value={sms1}
                        placeholder="_"
                        className="SmsInput__inputPiece"
                        type="text"
                        name="smsn-1"
                        maxLength={1}
                        onChange={handleChangeSms} />
                    <input
                        value={sms2}
                        placeholder="_"
                        className="SmsInput__inputPiece"
                        type="text"
                        name="smsn-2"
                        maxLength={1}
                        onChange={handleChangeSms} />
                    <input
                        value={sms3}
                        placeholder="_"
                        className="SmsInput__inputPiece"
                        type="text"
                        name="smsn-3"
                        maxLength={1}
                        onChange={handleChangeSms} />
                    <input
                        value={sms4}
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
                error={phoneError}
                // refPhone={refPhone}
                // phoneModel={"+7 444"}
                // activateInput={activateInput}
                // phoneOnChange={(event) => {phoneOnChangeHandler(event)}}
                buttonName={"запросить SMS-пароль"}
                buttonWidth={"303"}
                clicked={sendPhoneHandler}
            >
                <div className="PhoneInput__phoneBlock">
                    <p className="PhoneInput__phoneText">+7 (</p>
                    <input
                        onKeyPress={(event) => {sendPhoneByPressEnter(event)}}
                        placeholder="---"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--long"
                        type="text"
                        name="ssn-1"
                        maxLength={3}
                        onChange={handleChangePhone} />
                    <p className="PhoneInput__phoneText">) </p>
                    <input
                        onKeyPress={(event) => {sendPhoneByPressEnter(event)}}
                        placeholder="---"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--long"
                        type="text"
                        name="ssn-2"
                        maxLength={3}
                        onChange={handleChangePhone} />
                    <p className="PhoneInput__phoneText"> - </p>
                    <input
                        onKeyPress={(event) => {sendPhoneByPressEnter(event)}}
                        placeholder="--"
                        className="PhoneInput__inputPiece PhoneInput__inputPiece--short"
                        type="text"
                        name="ssn-3"
                        maxLength={2}
                        onChange={handleChangePhone} />
                    <p className="PhoneInput__phoneText"> - </p>
                    <input
                        onKeyPress={(event) => {sendPhoneByPressEnter(event)}}
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

    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const inputValue = (event) => {
        const {name, value} = event.target;
        setUser(prevState => {
            return {...prevState, [name]: value}
        });
    }
    const submitLoginUser = (event) => {
        event.preventDefault();
        dispatch(loginUser(user.username, user.password));
    }

    const submitLoginByEnterButton = (event) => {
        // Number 13 is the "Enter" key on the keyboard
        if(event.key === 'Enter'){
            event.preventDefault();

            dispatch(loginUser(user.username, user.password));

        }
    };

    const usernameError = useSelector(state => state.users.usernameLoginError);
    const passwordError = useSelector(state => state.users.passwordLoginError);

    if (status === "login") {
        question = "Не помните данные для входа?";
        link = "#";
        textLink = "Оставьте заявку в чат-боте WatsApp";
        contacts = "или позвоните на +7 707 390 11 12, и мы восстановим ваш логин и пароль.";
        loginContent = (
            <LoginForm 
                title={"Личный кабинет клиента"}
                keyPress={(event) => {submitLoginByEnterButton(event)}}
                submit={(event) => {submitLoginUser(event)}}
                loginOnChange={(event) => {inputValue(event)}}
                passwordOnChange={(event) => {inputValue(event)}}
                // checkOnChange
                errorUsername={usernameError}
                errorPassword={passwordError}
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

export default WithLoader(UserLoginPage, axios);