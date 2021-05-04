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
    addDetailsToApplicationInProcess, getClientName,
    getCurrentApplicationData, getHashOfTheLastApplication,
    getLastApplication,
    postNewApplication,
    setApplicationBackInProgress, setMyInterval
} from "../../Store/ApplicationsReducer/applicationsActions";

//TODO получить имя клиента по id для приветсвия когда создаем новую заявку, какой запрос отправляем
//TODO Посмотреть вернувшуюся в работу заявку, это модалка с данными, где взять данные по вернувшейся заявке?
//TODO Если статус "Отменено" и мы возвращаем заявку обратно, что происходит
//TODO Можно ли прикреплять файл к созданной заявке?

const ApplicationPage = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const idInTitle = `№ IT-${id}`;
    // const status = 'new' // Получить статус заявки при запросе данных заявки !!! Пока не пригодилось, работает и без этого
    // Статусы также вызываются в компоненте окна специалиста SpecialistWindowStatus
    // const applicationHash = useSelector(state => state.applications.newApplicationHash)
    const applicationHash = props.match.params.hash;
    const [oneComment, setOneComment] = useState("");

    const refFile = useRef();
    const [fileNameState, setFileNameState] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    // const [isModalApplication, setIsModalApplication] = useState(false);

    // const [isBackInProgress, setIsBackInProgress] = useState(false);
    const [isBackInProgress, setIsBackInProgress] = useState(true);

    let buttonName = "";


    let description = "";
    const title = "Предыдущая заявка";
    let center;
    let top;
    let leftSide;
    // const userName = "Светлана"; // отловить имя по id и вставить сюда

    const lastApplication = useSelector(state => state.applications.lastApplication);
    const currentApplication = useSelector(state => state.applications.currentApplicationData);
    const clientName = useSelector(state => state.applications.clientName)


    useEffect(() => {
        dispatch(getClientName(id))
        dispatch(getLastApplication(id));
    }, [dispatch]);
    useEffect(() => {
        if (applicationHash) {
            dispatch(getCurrentApplicationData(applicationHash));
        }
    }, [applicationHash])

    const [inputState, setInputState] = useState({
        id: id,
        problem: '',
        catid: '',
        message: '',
        tvpass: '',
        // files: ''
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
            return {...prevState, "files": event.target.files[0]}
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
            problem: '',
            catid: '',
            message: '',
            tvpass: '',
            // files: ''
        });
    }


    const isBackInProgressHandler = () => {
        if (!isBackInProgress) {
            setIsBackInProgress(true);
            dispatch(setApplicationBackInProgress(lastApplication.ref));
        }
    }
    // const showDetailsOfReturnedApplication = () => {
    //     setIsModalApplication(true)
    // }
    // const hideDetailsOfReturnedApplication = () => {
    //     setIsModalApplication(false)
    // }
    // Добавить функцию просмотра деталей заявки в модальном окне



    // https://itsupport.kz/itsp2/proxy.php?act=createEvent
    //     POST
    // problem=Заголовок title
    // message=Текст заявки
    // catid=ID Категории
    // tvpass=Тимвивер пасс
    // Сами файлы через формдату передавать. Массив с файлами можешь назвать files.
    //     Пока это работать не будет у тебя. Мне надо будет переписать скрипт загрузки.
    //     Чтобы сразу несколько файлов можно было грузить. На днях перепишем
    const submitFormHandler = async (event) => {
        event.preventDefault()
        let inputStateCopy = {...inputState}
        inputStateCopy.message += "<br />"

        await dispatch(postNewApplication(inputStateCopy, id))
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
    // открыть вернувшуюся заявку в новом окне
    const goToReturnedApplication = async () => {
        clearInputState();
        setIsBackInProgress(false);
        await dispatch(setApplicationBackInProgress(lastApplication.ref));
        await dispatch(getCurrentApplicationData(lastApplication.ref))
        // добавить смену статуса на Запланировано
    }

    const isDisabled = () => {
        setSubmitDisabled(false);
        Object.keys(inputState).forEach(key => {
            if (key !== "files" && key !== "tvpass") {
                if (!inputState[key]) {
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
        return ((parseInt(timeArray[0] * 60)) + parseInt(timeArray[1])) * 1000

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

        // if (currentApplication.result ? ((currentApplication.status !== "Завершено" || currentApplication.status !== "Отменено") && !interval.current && applicationHash) : false) {
        if (!!currentApplication.result) {
            interval.current = setInterval(() => {
                dispatch(getCurrentApplicationData(applicationHash))
                console.log("Maybe Stop")

                dispatch(setMyInterval(interval.current))
            }, 10000)

        } else {

            clearInterval(interval.current);
        }
        return () => {

            clearInterval(interval.current);
        }
    }, [currentApplication])

    const goToApplication = () => {
        if (id) {
            dispatch(push(`/application/${id}/new`));
        } else {
            dispatch(push(`/application/anonymous/new`));
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
                // timerDuration={currentApplication.timer ? parseTimerTime(currentApplication.timer) : null}
                timerDuration={currentApplication.timer ? parseTimerTime(currentApplication.timer) : null}
                // newApplication={false}
                newApplication={currentApplication.status === 'Запланировано'}
                // specialistFound={true}
                specialistFound={currentApplication.status === 'В работе'}
                // jobDone={true}
                jobDone={currentApplication.status === 'Завершено'}
                // isCanceled={false}
                isCanceled={currentApplication.status === 'Отменено'}
                name={currentApplication.responsible ? currentApplication.responsible : null}
                photo={currentApplication.image ? `data:image/jpg;base64, ${currentApplication.image}` : null}
                phone={currentApplication.phonenumber ? currentApplication.phonenumber : null}
                specialistId={currentApplication.contactperson ? currentApplication.contactperson.split(" ")[0] : null}
                hashApp={applicationHash}

                isLike={currentApplication ? currentApplication.rate === 1 : false}
                isDislike={currentApplication ? currentApplication.rate === -1 : false}
                commentResult={currentApplication ? !!currentApplication.comment : false}
                commentText={currentApplication ? currentApplication.comment : false}
            />
        )
    }
    // if (isApplicationSent || (currentApplication ? currentApplication.result : null)) {
    if (currentApplication ? currentApplication.result : null) {
        leftSide = (
            <ApplicationStatus
                id={id}
                specialistFound={currentApplication.status === 'В работе'}
                jobDone={currentApplication.status === 'Завершено'}
                isCanceled={currentApplication.status === 'Отменено'}
                backInProgress={goToReturnedApplication}
            />
        )
        } else if (lastApplication  && !!lastApplication.result ) {
    // } else if (lastApplication) {
        leftSide = (
            <PreviousApplicationMenu
                title={title}
                name={lastApplication.topic}
                date={lastApplication.date}
                description={description}
                buttonName={buttonName}
                clicked={isBackInProgress ? goToReturnedApplication : isBackInProgressHandler}
            />
        )
    }
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
            // status={status}
            oneComment={oneComment}
            onChangeComment={(event) => {
                textAreaHandler(event)
            }}
            submitComment={applyComment}
            // id={id}
            idInTitle={idInTitle}
            jobDone={currentApplication.status === 'Выполнено'}
            isCanceled={currentApplication.status === 'Отменено'}
        />)
    } else {
        center = (
            <ApplicationForm
                userName={clientName.result ? clientName.name : "Anonymous"}
                greetings={"здравствуйте! Опишите свою проблему"}

                subjectTitle={"Тема*"}
                subjectName="problem"
                subjectChange={(event) => {
                    inputHandler(event)
                }}
                subjectRequired={true}
                subjectPlaceholder={"Опишите кратко суть проблемы"}

                departmentTitle={"Отдел*"}
                departmentName="catid"
                departmentChange={(event) => {
                    inputHandler(event)
                }}
                departmentRequired={true}
                departmentPlaceholder={"В какой отдел отправить заявку?"}

                messageTitle={"Сообщение"}
                messageName="message"
                messageChange={(event) => {
                    inputHandler(event)
                }}
                messageRequired={true}
                messagePlaceholder={"Расскажите побробнее, например: утром вайфай еще работал, а после обеда выключается каждые пять минут отправляю письма, а они не доходят до получаетелей. Можно прикрепить к сообщению снимок экрана. Это поможет нам разобраться в проблеме."}

                fileClicked={(event) => {
                    chooseFile(event)
                }}
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
                passwordChange={(event) => {
                    inputHandler(event)
                }}
                passwordRequired={false}
                passwordPlaceholder={"Введите пароль"}
                toggleShowPassword={toogleShowPassword}

                buttonName={"Отправить заявку"}
                submitClicked={(event) => {
                    submitFormHandler(event)
                }}
                isDisabled={submitDisabled}

            />
        )
    }

    return (
        <>
            <LayoutApplicationPage
                goToApplicationHistory={goToHistoryOfApplications}
                createNewApplication={goToApplication}
                left={leftSide}
                center={center}
                top={top}
                hideButton={currentApplication ? !currentApplication.result : true}
            >
            </LayoutApplicationPage>
        </>
    )
}

export default ApplicationPage;