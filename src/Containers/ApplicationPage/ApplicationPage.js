import React, { useEffect, useRef, useState } from 'react';
import { Switch, useHistory } from 'react-router';
import ApplicationDetails from '../../Components/ApplicationPageComponents/ApplicationDetails/ApplicationDetails';
import ApplicationForm from '../../Components/ApplicationPageComponents/ApplicationForm/ApplicationForm';
import LayoutApplicationPage from '../../Components/ApplicationPageComponents/LayoutApplicationPage/LayoutApplicationPage';
import PreviousApplicationMenu from '../../Components/ApplicationPageComponents/PreviousApplicationMenu/PreviousApplicationMenu';
import SpecialitsWindowStatus from '../../Components/ApplicationPageComponents/SpecialitsWindowStatus/SpecialitsWindowStatus';


const ApplicationPage = (props) => {

    const id = props.match.params.id;
    const status = 'new' // Получить статус заявки при запросе данных заявки
    // Статусы также вызываются в компоненте окна специалиста SpecialistWindowStatus

    const refFile = useRef();
    const history = useHistory();
    const [fileNameState, setFileNameState] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);


    let isBackInProgress = false;
    let buttonName ="";
    const id_number = "№IT-051120-0375649";
    const date = "03.11.2019, 10:50";
    const name = "Не работает вай-фай";
    let description = "";
    const title = "Предыдущая заявка";
    let center;
    let top;
    let leftSide;
    const userName = "Светлана";



    const [inputState, setInputState] = useState({
        subject: '',
        department: '',
        message: '',
        password: '',
        file: ''
    })

    if (isBackInProgress) {
        description = `Заявка ${id_number} вернулась в работу, ИТ-специалист свяжется с вами в ближайшее время`;
        buttonName = "Посмотреть заявку в новом окне";
    } else {
        buttonName = "Вернуть в работу";
    }

    const hoverShowQuestion = () => {
        setShowQuestion(true);
    }

    const hoverHideQuestion = () => {
        setShowQuestion(false);
    }

    const toogleShowPassword = () => {
        if (isShowPassword) {
            setIsShowPassword(false);
        } else {
            setIsShowPassword(true);
        }
    }
    const chooseFile = (event) => {
        setFileNameState(event.target.files[0].name);
        setInputState(prevState => {
            return {...prevState, "file": event}
        });
    }
    const activateFileInput = () => {
        refFile.current.click();
    }

    const inputHandler = (event) => {
        const {name, value} = event.target;
        setInputState(prevState => {
            return {...prevState, [name]: value}
        });
    }

    
    if (fileNameState.trim() === '') {
        setFileNameState('Выберите файл')
    }
    const clearInputState = () => {
        setInputState({
            subject: '',
            department: '',
            message: '',
            password: '',
            file: ''
        });
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(inputState).forEach(key => {
            formData.append(key, inputState[key]);
        })
        // console.log(formData);
         // Отправка формы заявки с файлом или без файла
        clearInputState();
        history.push('application/idgoeshere') //add query params to get application by id
    }

    const isDisabled = () => {
        setSubmitDisabled(false);
        Object.keys(inputState).forEach(key => {
            if (key !== "file") {
                if (!inputState[key] ) {
                    setSubmitDisabled(true);
                }
            }
        });
    }
    useEffect(() => {
        isDisabled();
    }, [inputState]);

    if (id) {
        top = (
        <SpecialitsWindowStatus 
            status={status}
            id={id}
        />
            )
    }
    if (id) {
        leftSide = (<div>LEFT</div>)
    } else {
        leftSide = (
            <PreviousApplicationMenu 
                title={title}
                name={name}
                date={date}
                description={description}
                buttonName={buttonName}
                clicked={() => {alert("it works")}}
            />
    )}

    if (id) {
        center = (<ApplicationDetails 
            status={status}
            id={id}
        />)
    } else {
        center = (
            <ApplicationForm 
                userName={userName}
                greetings={"здравствуйте! Опишите свою проблему"}

                subjectTitle={"Тема*"}
                subjectName="subject"
                subjectChange={(event) => {inputHandler(event)}}
                subjectRequired={true}
                subjectPlaceholder={"Опишите кратко суть проблемы"}

                departmentTitle={"Отдел*"}
                departmentName="department"
                departmentChange={(event) => {inputHandler(event)}}
                departmentRequired={true}
                departmentPlaceholder={"В какой отдел отправить заявку?"}

                messageTitle={"Сообщение"}
                messageName="message"
                messageChange={(event) => {inputHandler(event)}}
                messageRequired={true}
                messagePlaceholder={"Расскажите побробнее, например: утром вайфай еще работал, а после обеда выключается каждые пять минут отправляю письма, а они не доходят до получаетелей. Можно прикрепить к сообщению снимок экрана. Это поможет нам разобраться в проблеме."}

                fileClicked={(event) => {chooseFile(event)}}
                iconClick={activateFileInput}
                fileRef={refFile}
                fileName={fileNameState}
                inputFileName="file"
                questionShow={hoverShowQuestion}
                questionHide={hoverHideQuestion}
                showQuestionModal={showQuestion}
                questionText={"Регистрационный номер заявки"}
                textTeamViewer={"Пароль от TeamViewer"}
                showPassword={isShowPassword}
                passwordName="password"
                passwordChange={(event) => {inputHandler(event)}}
                passwordRequired={false}
                passwordPlaceholder={"Введите пароль"}
                toggleShowPassword={toogleShowPassword}

                buttonName={"Отправить заявку"}
                submitClicked={(event) => {submitFormHandler(event)}}
                isDisabled={submitDisabled}

            />
    )}

    return (
        <LayoutApplicationPage
            left={leftSide}
            center={center}
            top={top}
            hideButton={!id}
        >
            <Switch>

            </Switch>
        </LayoutApplicationPage>
    )
}

export default ApplicationPage;