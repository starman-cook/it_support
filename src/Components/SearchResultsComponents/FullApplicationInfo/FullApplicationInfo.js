import React, { useState } from 'react';
import './FullApplicationInfo.css';
import { useDispatch } from "react-redux";
import {setApplicationBackInProgress} from "../../../Store/ApplicationsReducer/applicationsActions";


const FullApplicationInfo = (props) => {
    const dispatch = useDispatch();

    const application = props.application;


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
    const [currentFileImage, setCurrentFileImage] = useState("")

    const toggleModalImage = (imageSource) => {
        setCurrentFileImage(imageSource)
        setIsFileImageModal(!isFileImageModal);
    }

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
    let allSolution = [];
    let fileImage;
    let problem;
    let allProblems = [];
    let workerName;
    let isProblem = false;
    if (application) {
        color = application.status === 'Запланировано' ? "#E82024" : application.status === 'В работе' ? "#F3BB1C" : application.status === 'Завершено' ? "#3CC13B" : application.status === 'Отменено' ? '#828282' : null;
        date = application.dateCreate;
        status = application.status.toLowerCase();
        applicationId = application.number;
        specialistPhoto = application.implementer['photo'];
        specialist = application.implementer['name'];
        specialistId = application.implementer['id'];
        workerId = application.employee['id'];
        classLikeDislike = application.rating['value'] === 1 ? "like" : application.rating['value'] === -1 ? "dislike" : "";

        isComment = application.rating['comment'];
        department = application.departament;
        subject = application.subject;
        solution = application.outcome.split("\n");
        allSolution = solution.map((el, i) => {
            return <p key={i} className="FullApplicationInfo__content__text">{el}</p>
        });
        fileImage = application.images.length > 0 ? application.images.map((el, i) => {
            let fileExt = el.split('.').pop();
            let isImage = ['jpg', 'jpeg', 'png', 'bmp', 'svg', 'ico'].includes(fileExt.toLowerCase())
            return isImage ?
                    <div key={i} className="FullApplicationInfo__fileImage--canvas">
                        <img onClick={() => {toggleModalImage(el)}} className="FullApplicationInfo__fileImage" src={el} alt={subject}/>
                        {/*{inside}*/}
                    </div>
                    :
                    <div key={i} className="FullApplicationInfo__fileImage--canvas">
                        <a href={el} target='blanc' className="FullApplicationInfo__fileImage--link">{el.split('/').pop()}</a>
                    </div>
        }) : null
        problem = application.details.replaceAll("<br />", "").split("\n");
        workerName = application.employee.name;
        allProblems = problem.map((el, i) => {
            return el.length ? <p key={i} dangerouslySetInnerHTML={{__html: `${el}`}} className={`FullApplicationInfo__content__text ${el.includes("Комментарий") ? "FullApplicationInfo__content__text--commentDate" : ""}`} /> : null
        });
        isProblem = problem.length > 1;
    }
    const backInProgressHandler = () => {
        dispatch(setApplicationBackInProgress(application._id))
        props.clickToClose()
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
                            <div className="FullApplicationInfo__image" style={{background: `#E34A4E  url(data:image/jpg;base64,${specialistPhoto})center / cover no-repeat`}} />

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
                        <p className="FullApplicationInfo__text">{workerName}</p>
                        <p className="FullApplicationInfo__id">{workerId}</p>
                    </div>


                    <div className="FullApplicationInfo__likeAndCommentBlock">

                        <div className="FullApplicationInfo__likeAndCommentBlock--icons">
                            <div className={`FullApplicationInfo__icon--widthLikeDislike FullApplicationInfo__icon--${classLikeDislike}`} />
                            <div className={`${isComment ? "FullApplicationInfo__comment" : null} FullApplicationInfo__comment--width`} onMouseEnter={isComment ? hoverShowQuestionComment: null} onMouseLeave={isComment ? hoverHideQuestionComment : null}>
                                <div style={showQuestionComment ? {"display" : "block"} : {"display" : "none"}} className="FullApplicationInfo__comment--modal">
                                    <p className="FullApplicationInfo__comment--modal-text">{props.commentMessage}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={fileImage ? "FullApplicationInfo__content" : "FullApplicationInfo__content--noFile"}>
                    <div className={fileImage ? "FullApplicationInfo__content--left" : "FullApplicationInfo__content--left FullApplicationInfo__content--left--noFile"}>
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
                        {isProblem ? <p className="FullApplicationInfo__content__text--title">Подробности</p> : null}
                        <div>
                            {allProblems}
                        </div>


                        <p className="FullApplicationInfo__content__text--title">{status === "завершено" ? "Результат" : status === "отменено" ? "Причины отмены заявки" : ""}</p>
                        <div >
                            {allSolution}
                        </div>
                        {!fileImage && status === "завершено" ? <p className="FullApplicationInfo__backToWorkLink FullApplicationInfo__backToWorkLink--pushRight">Вернуть заявку в работу</p> : null}

                    </div>

                    {fileImage ? <div className="FullApplicationInfo__content--right">
                        <h2 className="FullApplicationInfo__content--title">
                            Прикрепленные файлы:
                        </h2>
                        {fileImage}

                        {status === "завершено" ? <p onClick={() => {backInProgressHandler()}} className="FullApplicationInfo__backToWorkLink">Вернуть заявку в работу</p> : null}
                    </div> : null}

                </div>


                <div className="FullApplicationInfo__footer" >
                    {!props.first ? <div className="FullApplicationInfo__btnLeft" onClick={props.goLeft}>
                                        <div className="FullApplicationInfo__arrowLeft" />
                                        <p className="FullApplicationInfo__btnTextLeft">
                                            Вернуться к предыдущей заявке
                                        </p>
                                    </div> : null}

                    {!props.last ? <div className="FullApplicationInfo__btnRight" onClick={props.goRight}>
                                        <p className="FullApplicationInfo__btnTextRight">
                                            Перейти к следующей заявке
                                        </p>
                                        <div className="FullApplicationInfo__arrowRight" />
                                    </div> : null}
                </div>
            </div>
            {isFileImageModal ? <div onClick={toggleModalImage} className="FullApplicationInfo__fileImage--modal">
                <div className="FullApplicationInfo__fileImage--modalCanvas">
                    <img className="FullApplicationInfo__fileImage" src={currentFileImage} alt={subject}/>
                </div>
            </div> : null}
        </>
    )
}

export default FullApplicationInfo;