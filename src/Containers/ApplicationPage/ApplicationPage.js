import React, { useEffect, useRef, useState } from 'react';
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
    postNewApplication, saveId,
    setApplicationBackInProgress, setMyInterval
} from "../../Store/ApplicationsReducer/applicationsActions";

//TODO получить имя клиента по id для приветсвия когда создаем новую заявку, какой запрос отправляем
//TODO Посмотреть вернувшуюся в работу заявку, это модалка с данными, где взять данные по вернувшейся заявке?
//TODO Если статус "Отменено" и мы возвращаем заявку обратно, что происходит
//TODO Можно ли прикреплять файл к созданной заявке?

const ApplicationPage = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const applicationHash = props.match.params.hash;
    const [oneComment, setOneComment] = useState("");

    const refFile = useRef();
    const [fileNameState, setFileNameState] = useState([]);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [isBackInProgress, setIsBackInProgress] = useState(false);

    let buttonName = "";


    let description = "";
    const title = "Предыдущая заявка";
    let center;
    let top;
    let leftSide;

    const lastApplication = useSelector(state => state.applications.lastApplication);
    const currentApplication = useSelector(state => state.applications.currentApplicationData);
    const clientName = useSelector(state => state.applications.clientName)


    useEffect(() => {
        clearInputState()
        dispatch(getClientName(id))
        dispatch(getLastApplication(id));
        dispatch(saveId(id))
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
        files: []
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

    const toggleShowPassword = () => {
        if (isShowPassword) {
            setIsShowPassword(false);
        } else {
            setIsShowPassword(true);
        }
    }
    const chooseFile = (event) => {
        const fileNameStateCopy = [...fileNameState]
        for (let i = 0; i < event.target.files.length; i++) {
            fileNameStateCopy.push(event.target.files[i].name)
            setFileNameState(fileNameStateCopy);
            const filesCopy = inputState.files
            filesCopy.push(event.target.files[i])
            setInputState(prevState => {
                return {...prevState, "files": filesCopy}
            });
        }
    }
    const activateFileInput = () => {
        refFile.current.click();
    }

    const deleteFile = (i) => {
        const fileNameStateCopy = [...fileNameState]
        fileNameStateCopy.splice(i, 1)
        setFileNameState(fileNameStateCopy)
        const filesCopy = inputState.files
        filesCopy.splice(i, 1)
        setInputState(prevState => {
            return {...prevState, "files": filesCopy}
        });
    }

    const inputHandler = (event) => {
        const {name, value} = event.target;
        setInputState(prevState => {
            return {...prevState, [name]: value}
        });
    }

    const clearInputState = () => {
        setFileNameState([])
        setInputState({
            id: id,
            problem: '',
            catid: '',
            message: '',
            tvpass: '',
            files: []
        });
    }


    const isBackInProgressHandler = () => {
        if (!isBackInProgress) {
            setIsBackInProgress(true);
            dispatch(setApplicationBackInProgress(lastApplication.ref));
        }
    }

    const submitFormHandler = async (event) => {
        event.preventDefault()
        let inputStateCopy = {...inputState}
        inputStateCopy.message += "\n"

        setInputState(prevState => {
            return {...prevState, "message": inputStateCopy.message}
        })

        const formData = new FormData();
        Object.keys(inputState).forEach(key => {
            if (typeof inputState[key] === 'object' && inputState[key] !== null) {
                for (let i = 0; i < inputState[key].length; i++) {
                    formData.append(key + "[]", inputState[key][i], inputState[key][i].name);
                }
            } else {
                formData.append(key, inputState[key]);
            }
        })
        dispatch(postNewApplication(formData, id));

        clearInputState();
        setIsBackInProgress(false);
    }
    // открыть вернувшуюся заявку в новом окне
    const goToReturnedApplication = async () => {
        clearInputState();
        setIsBackInProgress(false);
        await dispatch(setApplicationBackInProgress(lastApplication.ref));
        dispatch(push(`/application/${id}/${lastApplication.ref}`))
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
            body: oneComment
        }
        dispatch(addDetailsToApplicationInProcess(obj));
        setOneComment('');
        dispatch(getCurrentApplicationData(applicationHash));
    }

    useEffect(() => {
        isDisabled();
    }, [inputState]);

    const parseTimerTime = (totalTime) => {
        if (totalTime === "expired") return 0
        const timeArray = totalTime.split(":")
        return ((parseInt(timeArray[0] * 60)) + parseInt(timeArray[1])) * 1000
    }

    let interval = useRef();

    useEffect(() => {
        if (currentApplication ? !!currentApplication.result : false) {
            interval.current = setInterval(() => {
                dispatch(getCurrentApplicationData(applicationHash))
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
        clearInputState()
    };
    const goToHistoryOfApplications = () => {
        clearInterval(interval.current);
        dispatch(getCurrentApplicationData(""))
        dispatch(push("/search"));
        clearInputState()
    };

    let fileListBlocks;
    if (fileNameState.length) {
        fileListBlocks = fileNameState.map((el, i) => {
            return <div key={i} className="FileListBlocks__item">
                <p className="FileListBlocks__text">{el}</p>
                <div onClick={() => {deleteFile(i)}} className="FileListBlocks__iconDelete" />
            </div>
        })
    }


    if (currentApplication ? currentApplication.result : null) {
        top = (
            <SpecialitsWindowStatus
                id={id}
                timerDuration={currentApplication.timer ? parseTimerTime(currentApplication.timer) : null}
                newApplication={currentApplication.status === 'Запланировано'}
                specialistFound={currentApplication.status === 'В работе'}
                jobDone={currentApplication.status === 'Завершено'}
                isCanceled={currentApplication.status === 'Отменено'}
                name={currentApplication.responsible ? currentApplication.responsible : null}
                photo={currentApplication.image ? `data:image/jpg;base64, ${currentApplication.image}` : null}
                phone={currentApplication.phonenumber ? currentApplication.phonenumber : null}
                hashApp={applicationHash}
                isLike={currentApplication ? currentApplication.rate === 1 : false}
                isDislike={currentApplication ? currentApplication.rate === -1 : false}
                commentResult={currentApplication ? !!currentApplication.comment : false}
                commentText={currentApplication ? currentApplication.comment : false}
            />
        )
    }
    if (currentApplication ? currentApplication.result : null) {
        leftSide = (
            <ApplicationStatus
                id={id}
                specialistFound={currentApplication.status === 'В работе'}
                jobDone={currentApplication.status === 'Завершено'}
                isCanceled={currentApplication.status === 'Отменено'}
                backInProgress={() => {dispatch(setApplicationBackInProgress(applicationHash))}}
            />
        )
        } else if (lastApplication  && !!lastApplication.result ) {
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
    if (currentApplication ? currentApplication.result : null) {
        center = (<ApplicationDetails
            department={currentApplication.division}
            subject={currentApplication.topic}
            message={currentApplication.body}
            result={currentApplication.eventresult}
            showDetailsButton={currentApplication.body ? currentApplication.body.length > 100 : null}
            showResultButton={currentApplication.eventresult ? currentApplication.eventresult.length > 100 : null}
            oneComment={oneComment}
            onChangeComment={(event) => {
                textAreaHandler(event)
            }}
            submitComment={applyComment}
            idInTitle={currentApplication ? currentApplication.humanId : null}
            jobDone={currentApplication.status === 'Завершено'}
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

                fileClicked={chooseFile}
                iconClick={activateFileInput}
                fileRef={refFile}
                fileName={"Добавить файлы"}
                inputFileName="file"
                questionShow={hoverShowQuestion}
                questionHide={hoverHideQuestion}
                showQuestionModal={showQuestion}
                questionText={"Прикрепите необходимые по вашему мнению файлы"}
                textTeamViewer={"Пароль от TeamViewer"}
                showPassword={isShowPassword}
                passwordName="tvpass"
                passwordChange={(event) => {
                    inputHandler(event)
                }}
                passwordRequired={false}
                passwordPlaceholder={"Введите пароль"}
                toggleShowPassword={toggleShowPassword}

                buttonName={"Отправить заявку"}
                submitClicked={(event) => {
                    submitFormHandler(event)
                }}
                isDisabled={submitDisabled}
                chosenFiles={fileListBlocks}
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