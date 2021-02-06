import React, { useState } from 'react';
import './FullApplicationInfo.css';
import {push} from 'connected-react-router';
import { useDispatch } from "react-redux";


const FullApplicationInfo = (props) => {
    const dispatch = useDispatch();
    // const [index, setIndex] = useState(props.index); // передаем индекс и вытаскиваем из массива заявок нужную, всего в массиве 10 заявок, далее осуществлять дозагрузку заявок, также по 10 штук
    // const applications = props.applications;
    // Получаем по id подробные данные заявки
    // const application = { // вот здесь будет использована полученная информация с редакса по id
    //
    //     date: "03. 11. 2019, 10:50",
    //     status: "завершено",
    //     subject:"Не работает вайфай",
    //     department: "Удаленная поддержка",
    //     specialist: "Александра Панарина",
    //     specialistId:"IT 152",
    //     problem: "Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал.",
    //     solution: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
    //     classLikeDislike: 'like',
    //     isComment: true,
    //     comment: 'Comment',
    //     workerId: "ID Устройства 3245875",
    //     specialistPhoto: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg",
    //     applicationId: "IT-011220-039862",
    //     worker: 'Примерный рабочий',
    //     fileImage: "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg"
    // };
    // let color;



    const application = props.application;
    // console.log(applications);


    const [showQuestionComment, setShowQuestionComment] = useState(false);
    const [showQuestionApplicationId, setShowQuestionApplicationId] = useState(false);
    const [showQuestionSpecialist, setShowQuestionSpecialist] = useState(false);
    const [isFileImageModal, setIsFileImageModal] = useState(false);
    
    const hoverShowQuestionComment = () => {
        setShowQuestionComment(true);
    }
    const hoverHideQuestionComment = () => {
        setShowQuestionComment(false);
    }
    const hoverShowQuestionApplicationId = () => {
        setShowQuestionApplicationId(true);
    }
    const hoverHideQuestionApplicationId = () => {
        setShowQuestionApplicationId(false);
    }
    const hoverShowQuestionSpecialist = () => {
        setShowQuestionSpecialist(true);
    }
    const hoverHideQuestionSpecialist = () => {
        setShowQuestionSpecialist(false);
    }
    // const closeThisWindow = () => {
    //     {}
    // }
    const toggleModalImage = () => {
        setIsFileImageModal(!isFileImageModal);
    }
    // const goLeft = () => {
    //     setIndex(index - 1);
    // }
    // const goRight = () => {
    //     setIndex(index + 1);
    // }
    let color;
    let date;
    let status;
    let applicationId;
    let specialistPhoto;
    let specialist;
    let specialistId;
    let workerId;
    let classLikeDislike;
    let isComment;
    let department;
    let subject;
    let solution;
    let fileImage;
    let problem;
    if (application) {
        color = application.status === 'запланировано' ? "#E82024" : application.status === 'в работе' ? "#F3BB1C" : application.status === 'завершено' ? "#3CC13B" : application.status === 'отменено' ? '#828282' : null;
        date = application.date;
        status = application.status;
        applicationId = application.applicationId;
        specialistPhoto = application.specialistPhoto;
        specialist = application.specialist;
        specialistId = application.specialistId;
        workerId = application.workerId;
        classLikeDislike = application.classLikeDislike;
        isComment = application.isComment;
        department = application.department;
        subject = application.subject;
        solution = application.solution;
        fileImage = application.fileImage;
        problem = application.problem;
    }

    return (
        <>
            <div className="FullApplicationInfo">
                <div className="FullApplicationInfo__header">
                    <div onClick={props.clickToClose} className="FullApplicationInfo__close" />
                    <div className="FullApplicationInfo__statusDateBlock">
                        <p className="ResultsItemWorker__text">{date}</p>
                        <p style={{background: color}} className="FullApplicationInfo__status">{status}</p>
                    </div>

                    <div className="FullApplicationInfo__ApplicationIdBlock">
                        <p className="ResultsItemWorker__text--red">Номер заявки:</p>
                        <div className="ResultsItemWorker__applicationId">
                            <p className="ResultsItemWorker__text--red  ResultsItemWorker__text--applicationId">{applicationId}</p>
                            <div className="FullApplicationInfo__question--icon" onMouseEnter={hoverShowQuestionApplicationId} onMouseLeave={hoverHideQuestionApplicationId}>
                                <div style={showQuestionApplicationId ? {"display" : "block"} : {"display" : "none"}} className="FullApplicationInfo__comment--modal">
                                    <p className="FullApplicationInfo__comment--modal-text">Регистрационный номер заявки</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="FullApplicationInfo__workerIdBlock">
                        <div className="FullApplicationInfo__workerIdBlock--imageBlock">
                            <div className="FullApplicationInfo__image" style={{background: `#E34A4E  url(${specialistPhoto})center / cover no-repeat`}} />

                            <div className="FullApplicationInfo__workerIdAndQuestionBlock">
                                <p className="FullApplicationInfo__text">{specialist}</p>
                                <div className="FullApplicationInfo__specialistIdBlock">
                                    <p className="FullApplicationInfo__id">{specialistId}</p>
                                    <div className="FullApplicationInfo__question--icon" onMouseEnter={hoverShowQuestionSpecialist} onMouseLeave={hoverHideQuestionSpecialist}>
                                        <div style={showQuestionSpecialist ? {"display" : "block"} : {"display" : "none"}} className="FullApplicationInfo__comment--modal">
                                            <p className="FullApplicationInfo__comment--modal-text">У каждого специалиста IT Support есть уникальный IT-номер, во-первых это красиво, а во-вторых он совпадает с внутренним номером телефона. Вы всегда сможете позвонить напрямую исполнителю заявки или написать электронное письмо.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="FullApplicationInfo__workerIdBlock">
                        <p className="FullApplicationInfo__text">{specialist}</p>
                        <p className="FullApplicationInfo__id">{workerId}</p>
                    </div>


                    <div className="FullApplicationInfo__likeAndCommentBlock">

                        <div className="FullApplicationInfo__likeAndCommentBlock--icons">
                            <div className={`FullApplicationInfo__icon--widthLikeDislike FullApplicationInfo__icon--${classLikeDislike}`} />
                            <div className={`${isComment ? "FullApplicationInfo__comment" : null} FullApplicationInfo__comment--width`} onMouseEnter={isComment ? hoverShowQuestionComment: null} onMouseLeave={isComment ? hoverHideQuestionComment : null}>
                                <div style={showQuestionComment ? {"display" : "block"} : {"display" : "none"}} className="FullApplicationInfo__comment--modal">
                                    <p className="FullApplicationInfo__comment--modal-text">Пользователь оставил коментарий к этой задаче, для того чтобы посмотреть его проскрольте описание заявки до конца.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="FullApplicationInfo__content">
                    <div className="FullApplicationInfo__content--left">
                        <h2 className="FullApplicationInfo__content__title">Детали заявки</h2>
                        <div className="FullApplicationInfo__content__head">
                            <div className="FullApplicationInfo__content__head--sides">
                                <p className="FullApplicationInfo__content__text--title">Ответственный отдел</p>
                                <p className="FullApplicationInfo__content__text">{department}</p>
                            </div>
                            <div className="FullApplicationInfo__content__head--sides">
                                <p className="FullApplicationInfo__content__text--title">Тема</p>
                                <p className="FullApplicationInfo__content__text">{subject}</p>
                            </div>
                        </div>
                        <p className="FullApplicationInfo__content__text--title">Подробности</p>
                        <div>
                            <p className="FullApplicationInfo__content__text">{problem}</p>

                        </div>


                        <p className="FullApplicationInfo__content__text--title">Результат</p>
                        <div >
                            <p className="FullApplicationInfo__content__text">{solution}</p>
                        </div>


                    </div>

                    <div className="FullApplicationInfo__content--right">
                        <h2 className="FullApplicationInfo__content--title">
                            Прикрепленные файлы:
                        </h2>
                        <div className="FullApplicationInfo__fileImage--canvas">
                            <img onClick={toggleModalImage} className="FullApplicationInfo__fileImage" src={fileImage} alt={subject}/>
                        </div>


                        <p className="FullApplicationInfo__backToWorkLink">Вернуть заявку в работу</p>
                    </div>
                </div>


                <div className="FullApplicationInfo__footer" >
                    <div className="FullApplicationInfo__btnLeft" onClick={props.goLeft}>
                        <div className="FullApplicationInfo__arrowLeft" />
                        <p className="FullApplicationInfo__btnTextLeft">
                            Вернуться к предыдущей заявке
                        </p>
                    </div>

                    <div className="FullApplicationInfo__btnRight" onClick={props.goRight}>
                        <p className="FullApplicationInfo__btnTextRight">
                            Перейти к следующей заявке
                        </p>
                        <div className="FullApplicationInfo__arrowRight" />
                    </div>
                </div>
            </div>
            {isFileImageModal ? <div onClick={toggleModalImage} className="FullApplicationInfo__fileImage--modal">
                <div className="FullApplicationInfo__fileImage--modalCanvas">
                    <img className="FullApplicationInfo__fileImage" src={fileImage} alt={subject}/>
                </div>
            </div> : null}
        </>
    )
}

export default FullApplicationInfo;