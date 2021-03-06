import React, { useState, useEffect } from 'react';
import AuthenticationModal from '../../Components/UserLoginPageComponents/AuthenticationModal/AuthenticationModal';
import HelperInfo from '../../Components/UserLoginPageComponents/HelperInfo/HelperInfo';
import LoginForm from '../../Components/UserLoginPageComponents/LoginForm/LoginForm';
import MyPhoneInput from '../../Components/UserLoginPageComponents/PhoneInput/MyPhoneInput';
import SmsInput from '../../Components/UserLoginPageComponents/SmsInput/SmsInput';
import {useDispatch, useSelector} from "react-redux";
import {loginUser, saveUser, sendPhone, sendSms, setLoginStatus} from "../../Store/UsersReducer/usersActions";
import axios from "../../axiosApi";
import WithLoader from '../../hoc/WithLoader/WithLoader';
import {clearMyInterval, forgetMe} from "../../Store/ApplicationsReducer/applicationsActions";
import PhoneInput from 'react-phone-input-2'
import "./UserLoginPage.css"

const UserLoginPage = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    useEffect(() => {
        dispatch(clearMyInterval())
        if (id) {
            dispatch(setLoginStatus("phone"));
        }
    }, [id]);
    const [phone, setPhone] = useState("")

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
        if (id) {
            dispatch(saveUser(id));
        }
    }, [dispatch]);

    const phoneError = useSelector(state => state.users.phoneLoginError);
    const smsError = useSelector(state => state.users.smsLoginError);

    const sendPhoneByPressEnter = async (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            await sendPhoneHandler()
        }
    }

    const sendPhoneHandler = async () => {
        await dispatch(sendPhone({phone: "+" + phone}, id));
    }
    const resendSmsHandler = async() => {
        await sendPhoneHandler();
        setSms1('');
        setSms2('');
        setSms3('');
        setSms4('');
    }

    const status = useSelector(state => state.users.loginStatus);
    let grey = false;
    let loginContent;
    let question;
    let link;
    let textLink;
    let contacts;


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
        question = "?? ?????? ???????????????? ???????????????????";
        link = "https://wa.me/77473901112";
        textLink = "???????????????? ???????????? ?? ??????-???????? WatsApp";
        contacts = "?????? ?????????????????? ???? +7 707 390 11 12, ?? ???? ??????-???????????? ??????????????????.";
        loginContent = (
            <SmsInput
                time={"15"}
                wrongPassword={smsError === "denied"}
                error={smsError === "denied"}
                buttonName={"?????????????????? SMS ????????????????"}
                buttonWidth={"303"}
                phone={`+7 ${phone.slice(1, 4)} *** ** ${phone.slice(9, phone.length)} `}
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
    const inputPhoneValue = (event) => {
        if (!phone.length) {
            setPhone("7" + event)
        } else {
            setPhone(event)
        }
    }
    if (status === "phone") {
        grey = true;
        question = "?? ?????? ???????????????? ???????????????????";
        link = "https://wa.me/77473901112";
        textLink = "???????????????? ???????????? ?? ??????-???????? WatsApp";
        contacts = "?????? ?????????????????? ???? +7 707 390 11 12, ?? ???? ??????-???????????? ??????????????????.";
        loginContent = (
            <MyPhoneInput
                error={phoneError === "denied"}
                buttonName={"?????????????????? SMS-????????????"}
                buttonWidth={"303"}
                clicked={sendPhoneHandler}
            >
                <PhoneInput
                    onKeyDown={(event) => {sendPhoneByPressEnter(event)}}
                    placeholder ='+7 (___) __-__-__'
                    masks={{kz: '(...) ..-..-..'}}
                    value={phone}
                    onChange={(event) => {inputPhoneValue(event)}}
                    inputProps={{
                        required: true,
                        autoFocus: true
                    }}
                    alwaysDefaultMask={false}
                />
            </MyPhoneInput>
        )
    }

    const [user, setUser] = useState({
        username: "",
        password: "",
        remember: null
    });
    const inputValue = (event) => {
        const {name, value} = event.target;
        setUser(prevState => {
            return {...prevState, [name]: value}
        });
    }
    const submitLoginUser = (event) => {
        event.preventDefault();
        if (user.remember !== 'on') {
            dispatch(forgetMe())
        }
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
        question = "???? ?????????????? ???????????? ?????? ???????????";
        link = "https://wa.me/77473901112";
        textLink = "???????????????? ???????????? ?? ??????-???????? WatsApp";
        contacts = "?????? ?????????????????? ???? +7 707 390 11 12, ?? ???? ?????????????????????? ?????? ?????????? ?? ????????????.";
        loginContent = (
            <LoginForm 
                title={"???????????? ?????????????? ??????????????"}
                keyPress={(event) => {submitLoginByEnterButton(event)}}
                submit={(event) => {submitLoginUser(event)}}
                loginOnChange={(event) => {inputValue(event)}}
                passwordOnChange={(event) => {inputValue(event)}}
                checkOnChange={(event) => {inputValue(event)}}
                errorUsername={usernameError}
                errorPassword={passwordError}
                buttonName={"??????????"}
                buttonWidth={"142"}
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
                instagram={"https://www.instagram.com/itsupport.kz/?hl=ru"}
                facebook={"https://www.facebook.com/itsupport.kz/"}
                linkedin={"https://www.linkedin.com/company/it-support-group-kazakhstan?originalSubdomain=kz"}
                youtube={"https://www.youtube.com/channel/UCsnFSIp17CHdL-h69_8mgnQ"}
            />
        </div>
    )
}

export default WithLoader(UserLoginPage, axios);