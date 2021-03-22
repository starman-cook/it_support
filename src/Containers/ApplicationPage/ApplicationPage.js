import React, { useEffect, useRef, useState, useMemo } from 'react';
import ApplicationDetails from '../../Components/ApplicationPageComponents/ApplicationDetails/ApplicationDetails';
import ApplicationForm from '../../Components/ApplicationPageComponents/ApplicationForm/ApplicationForm';
import ApplicationStatus from '../../Components/ApplicationPageComponents/ApplicationStatus/ApplicationStatus';
import LayoutApplicationPage from '../../Components/ApplicationPageComponents/LayoutApplicationPage/LayoutApplicationPage';
import PreviousApplicationMenu from '../../Components/ApplicationPageComponents/PreviousApplicationMenu/PreviousApplicationMenu';
import SpecialitsWindowStatus from '../../Components/ApplicationPageComponents/SpecialitsWindowStatus/SpecialitsWindowStatus';
import {push} from 'connected-react-router'
import {useDispatch, useSelector} from "react-redux";
import {
    addDetailsToApplicationInProcess,
    getCurrentApplicationData, getHashOfTheLastApplication,
    getLastApplication,
    postNewApplication,
    setApplicationBackInProgress, setMyInterval
} from "../../Store/ApplicationsReducer/applicationsActions";

const ApplicationPage = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    // const id = '353-01-00858';
    const idInTitle = `№ IT-${id}`;
    const status = 'new' // Получить статус заявки при запросе данных заявки !!! Пока не пригодилось, работает и без этого
    // Статусы также вызываются в компоненте окна специалиста SpecialistWindowStatus
    const applicationHash = useSelector(state => state.applications.newApplicationHash)
    const [oneComment, setOneComment] = useState("");

    const refFile = useRef();
    const [fileNameState, setFileNameState] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    // const [isApplicationSent, setIsApplicationsSent] = useState(false);

    const [isBackInProgress, setIsBackInProgress] = useState(false);

    let buttonName ="";
    // const id_number = "№IT-051120-0375649";

    let description = "";
    const title = "Предыдущая заявка";
    let center;
    let top;
    let leftSide;
    const userName = "Светлана";

    const lastApplication = useSelector(state => state.applications.lastApplication);
    const currentApplication = useSelector(state => state.applications.currentApplicationData);
    // const date = "03.11.2019, 10:50";
    // const name = "Не работает вай-фай";


    // useEffect(() => {
    //     dispatch(getLastApplication(id));
    //     setIsApplicationsSent(false);
    // }, [dispatch]);
    useEffect(() => {
        // if (oneComment.trim() === '') {
            console.log('Maybe STOP?')
            if (applicationHash) {
                dispatch(getCurrentApplicationData(applicationHash));
                // dispatch(getCurrentApplicationData("a2b2892b03f27e4841ce52a23452c5ce"));
            }
        // }
    }, [applicationHash])

    const [inputState, setInputState] = useState({
        id: id,
        title: '',
        catid: '',
        body: '',
        tvpass: '',
        // images: ''
    })

    if (isBackInProgress) {
        description = `Заявка вернулась в работу, ИТ-специалист свяжется с вами в ближайшее время`;
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
            return {...prevState, "images": event.target.files[0]}
        });
        console.log("INPUT STATE: ", inputState);
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
            id: id,
            title: '',
            catid: '',
            body: '',
            tvpass: '',
            // images: ''
        });
    }


    // не работает((((
    const isBackInProgressHandler = () => {
        if (!isBackInProgress) {
            setIsBackInProgress(true);
            dispatch(setApplicationBackInProgress(lastApplication.ref));
        }
    }

    const submitFormHandler = async (event) => {
        event.preventDefault()
        let inputStateCopy = {...inputState}
        inputStateCopy.body += "<br />"

        await dispatch(postNewApplication(inputStateCopy))
        // setIsApplicationsSent(true);
        clearInputState();
        setIsBackInProgress(false);
        // await dispatch(getCurrentApplicationData(applicationHash));
        // event.preventDefault();
        // const formData = new FormData();
        // Object.keys(inputState).forEach(key => {
        //     formData.append(key, inputState[key]);
        // })
        // dispatch(postNewApplication(formData));
        // console.log(inputState);
        // setIsBackInProgress(false);
        //  // Отправка формы заявки с файлом или без файла
        // clearInputState();
        // setIsApplicationsSent(true);
        // dispatch(push(`/application/${id}`)); //add query params to get application by id
    }

    const isDisabled = () => {
        setSubmitDisabled(false);
        Object.keys(inputState).forEach(key => {
            if (key !== "images" && key !== "tvpass") {
                if (!inputState[key] ) {
                    setSubmitDisabled(true);
                }
            }
        });
    }
    const textAreaHandler = (event) => {
        setOneComment(event.target.value);
    }
    const applyComment = () => {
        if (oneComment === undefined || oneComment.trim() === '') {
            return;
        }

        const obj = {
            document: applicationHash,
            body: `<br />${oneComment}<br />`
        }
        dispatch(addDetailsToApplicationInProcess(obj));
        setOneComment('');
        dispatch(getCurrentApplicationData(applicationHash));
    }

    useEffect(() => {
        isDisabled();
    }, [inputState]);

    const parseTimerTime = (totalTime) => {
        const timeArray = totalTime.split(":")
        return ((parseInt(timeArray[0]*60)) + parseInt(timeArray[1]))*1000

    }


    // let testInterval = useMemo(() => {
    //     if (currentApplication.timer ? currentApplication.timer !== "expired": null) {
    //         interval = setInterval(() => {
    //             dispatch(getCurrentApplicationData(applicationHash))
    //             console.log("Maybe Stop")
    //
    //         }, 10000)
    //
    //     } else {
    //         clearInterval(interval);
    //         console.log("Maybe Stop")
    //
    //     }
    //     return interval
    // }, [currentApplication.timer])
    let interval = useRef();

    useEffect(() => {

        if (currentApplication.timer !== "expired" && !interval.current && applicationHash) {
            interval.current = setInterval( () => {
                dispatch(getCurrentApplicationData(applicationHash))
                console.log("Maybe Stop")

                dispatch(setMyInterval(interval.current))
            }, 10000)

        }
        else {

            clearInterval(interval.current);
            console.log("Maybe Stop")
        }
        return () => {

            clearInterval(interval.current);
        }
    }, [applicationHash])

    const goToApplication = () => {
        if (id) {
            dispatch(push(`/application/${id}`));
        } else {
            dispatch(push(`/application/anonymous`));
        }
        clearInterval(interval.current);
        dispatch(getHashOfTheLastApplication(""))
        dispatch(getCurrentApplicationData(""))
    };
    const goToHistoryOfApplications = () => {
        clearInterval(interval.current);
        dispatch(getCurrentApplicationData(""))
        dispatch(push("/search"));
    };

   // useEffect(() => {
   //     console.log("Maybe Stop")
   //     let interval
   //     if (currentApplication.timer ? currentApplication.timer !== "expired": null) {
   //         interval = setInterval(() => {
   //             dispatch(getCurrentApplicationData(applicationHash))
   //             console.log("Maybe Stop")
   //
   //         }, 10000)
   //
   //     } else {
   //         clearInterval(interval);
   //         console.log("Maybe Stop")
   //
   //     }
   // }, [])


    // if (isApplicationSent || (currentApplication ? currentApplication.result : null)) {
    if (currentApplication ? currentApplication.result : null) {
        top = (
            <SpecialitsWindowStatus 
                id={id}
                timerDuration={currentApplication.timer ? parseTimerTime(currentApplication.timer) : null}
                newApplication={currentApplication.timer ? currentApplication.timer !== "expired" : false}
                specialistFound={currentApplication.timer ? currentApplication.timer.trim() === "expired" : null}
                jobDone={currentApplication.status === 'Выполнено'}
                isCanceled={currentApplication.status === 'Отменено'}
                name={currentApplication.contactperson ? currentApplication.contactperson : null}
                photo={currentApplication.image ? `data:image/jpg;base64, ${currentApplication.image}` : null}
                phone={currentApplication.phonenumber ? currentApplication.phonenumber : null}
                specialistId={currentApplication.contactperson ? currentApplication.contactperson.split(" ")[0] : null}
        />
            )
    }
    // if (isApplicationSent || (currentApplication ? currentApplication.result : null)) {
    if (currentApplication ? currentApplication.result : null) {
        leftSide = (
            <ApplicationStatus 
                id={id}
                specialistFound={currentApplication.timer ? currentApplication.timer.trim() === "expired" : null}
                jobDone={currentApplication.status === 'Выполнено'}
                isCanceled={currentApplication.status === 'Отменено'}
                
            />
        )
    } else if (lastApplication) {
        leftSide = (
            <PreviousApplicationMenu 
                title={title}
                name={lastApplication.topic}
                date={lastApplication.date}
                description={description}
                buttonName={buttonName}
                clicked={isBackInProgressHandler}
            />
    )}
//264 letters
//     if (isApplicationSent || (currentApplication ? currentApplication.result : null)) {
    if (currentApplication ? currentApplication.result : null) {
        center = (<ApplicationDetails
            department={currentApplication.division}
            subject={currentApplication.topic}
            message={currentApplication.body}
            result={currentApplication.eventresult}
            showDetailsButton={currentApplication.body ? currentApplication.body.length > 100 : null}
            showResultButton={currentApplication.eventresult ? currentApplication.eventresult.length > 100 : null}
            status={status}
            oneComment={oneComment}
            onChangeComment={(event) => {textAreaHandler(event)}}
            submitComment={applyComment}
            // id={id}
            idInTitle={idInTitle}
            jobDone={currentApplication.status === 'Выполнено'}
            isCanceled={currentApplication.status === 'Отменено'}
        />)
    } else {
        center = (
            <ApplicationForm 
                userName={userName}
                greetings={"здравствуйте! Опишите свою проблему"}

                subjectTitle={"Тема*"}
                subjectName="title"
                subjectChange={(event) => {inputHandler(event)}}
                subjectRequired={true}
                subjectPlaceholder={"Опишите кратко суть проблемы"}

                departmentTitle={"Отдел*"}
                departmentName="catid"
                departmentChange={(event) => {inputHandler(event)}}
                departmentRequired={true}
                departmentPlaceholder={"В какой отдел отправить заявку?"}

                messageTitle={"Сообщение"}
                messageName="body"
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
                passwordName="tvpass"
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
            goToApplicationHistory={goToHistoryOfApplications}
            createNewApplication={goToApplication}
            left={leftSide}
            center={center}
            top={top}
            hideButton={currentApplication ?  !currentApplication.result : true}
        >
        </LayoutApplicationPage>
    )
}

export default ApplicationPage;