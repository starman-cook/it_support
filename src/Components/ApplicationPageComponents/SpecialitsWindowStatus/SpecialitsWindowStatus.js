import React, { useEffect, useState } from 'react';
import BlueButton from '../BlueButton/BlueButton';
import './SpecialitsWindowStatus.css';


const SpecialitsWindowStatus = (props) => {
    let timerDuration = 900000; //15 минут
    const status = props.status;
    const id = props.id;
    let topComponent;
    const [seconds, setSeconds] = useState("00");
    const [minutes, setMinutes] = useState(15);
    const [oneComment, setOneComment] = useState();
    const [isComment, setIsComment] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [isDisLike, setIsDisLike] = useState(false);

    let leaveCommentBlock;
    let timer = null;
    let newApplication = props.newApplicationl
    let specialistFound = props.specialistFound;
    let jobDone = props.jobDone;
    let isCanceled = props.isCanceled;

    useEffect(() => {
       if (newApplication) {
        if (timerDuration > 0 && !timer) {
            timer = setInterval(() => {
                let seconds = (timerDuration % 60000) / 1000;
                let minutes = Math.floor(timerDuration / 60000);
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                setSeconds(seconds);
                setMinutes(minutes);
                timerDuration -= 1000;
                if (minutes === "00" && seconds === "00") {
                    clearInterval(timer);
                }
            }, 1000);
        }
        if (timerDuration <= 0) {
            clearInterval(timer);
            timer = null;
        }
        return(() => {
            clearInterval(timer)
        })
    }
    }, []);

    const applyComment = () => {
        if (oneComment === undefined || oneComment.trim() === '') {
            return;
        }
        setIsComment(true);
    }
    const textAreaHandler = (event) => {
        setOneComment(event.target.value);
    }
    const isLikeHandler = () => {
        setIsLike(true);
    }
    const isDisLikeHandler = () => {
        setIsDisLike(true);
    }
    if (!isComment) {
    leaveCommentBlock = (
        <div className="leaveCommentBlock">
            {!isLike && !isDisLike 
                ? 
            <div className="leaveCommentBlock__likeBlock">
                <div onClick={isLikeHandler} className="leaveCommentBlock__icon leaveCommentBlock__icon--like" />
                <div onClick={isDisLikeHandler} className="leaveCommentBlock__icon leaveCommentBlock__icon--dislike" />
            </div> 
                : 
            <div className="isCommentBlock--likeOrNot">
                {isLike ? <div className="isCommentBlock__like" /> : null}
                {isDisLike ? <div className="isCommentBlock__dislike" /> : null}
            </div>}

            
            <div className="leaveCommentBlock__commentBlock">
                <textarea value={oneComment} placeholder="Напишите краткий отзыв" onChange={(event) => {textAreaHandler(event)}} className="leaveCommentBlock__textarea"></textarea>
                    <div className="leaveCommentBlock__btn">
                        <BlueButton
                            name="Отправить отзыв"
                            clicked={() => {applyComment()}}
                        />
                    </div>
            </div>
        </div>
    )} else {
        leaveCommentBlock = (
            <div className="isCommentBlock">
                {!isLike && !isDisLike 
                        ? 
                    <div className="leaveCommentBlock__likeBlock">
                        <div onClick={isLikeHandler} className="leaveCommentBlock__icon leaveCommentBlock__icon--like" />
                        <div onClick={isDisLikeHandler} className="leaveCommentBlock__icon leaveCommentBlock__icon--dislike" />
                    </div> 
                        : 
                    <div className="isCommentBlock--likeOrNot">
                        {isLike ? <div className="isCommentBlock__like" /> : null}
                        {isDisLike ? <div className="isCommentBlock__dislike" /> : null}
                    </div>}
                <div className="isCommentBlock__textBlock">
                    <h2 className="isCommentBlock__title">Отзыв пользователя:</h2>
                    <p className="isCommentBlock__text">{oneComment}</p>
                </div>
            </div>
        )
    }

   


    // possible statusses 'new' 'in_progress' 'complete' 'canceled'
    if (newApplication) {
    topComponent = (
        <div className="StatusNew">
            <h2 className="StatusNew__title">Получили вашу заявку, спасибо!</h2>
            <p className="StatusNew_text">Мы назначим ИТ-специалиста в течение:</p>
            <div className="StatusNew__timeBlock">
                <span className="StatusNew__time StatusNew__time--numbers">{minutes}</span>
                <span className="StatusNew__time">:</span>
                <span className="StatusNew__time StatusNew__time--numbers">{seconds}</span>
            </div>
        </div>
    )} else {
        topComponent = (
            <div className="SpecialistWindow">
                <h2 className={`SpecialistWindow__title ${specialistFound ? "color-orange" : ""} ${jobDone ? "color-green" : ""} ${isCanceled ? "color-grey" : ""}`}>{specialistFound ? "Заявка в работе" : ""}{jobDone ? "Заявка закрыта" : ""}{isCanceled ? "Заявка отменена" : ""}</h2>
            
                <div className="SpecialistWindow__content">
                    <div className="SpecialistWindow__avatar--frame">
                        <img className="SpecialistWindow__avatar--image" src={props.photo} alt={props.name} />
                    </div>

                    <div className="SpecialistWindow__textBlock">
                        {specialistFound ? <h3 className="SpecialistWindow__title--small">Скоро с вами свяжется</h3> : null}
                        {jobDone ? <p className="SpecialistWindow__text SpecialistWindow__text--pushDown">Оцените работу ИТ-специалиста, если нужно — напишите краткий отзыв, нам будет приятно. </p> : null}
                        {isCanceled ? <p className="SpecialistWindow__text SpecialistWindow__text--pushDown">Оцените работу ИТ-специалиста, если нужно — напишите краткий отзыв, нам будет приятно. </p> : null}
                    
                        <div className="SpecialistWindow__nameAndPhone">
                            <h3 className="SpecialistWindow__name">
                                {props.name}
                            </h3>
                            <p className="SpecialistWindow__text">
                                {props.phone}
                            </p>
                        </div>
                        <p className="SpecialistWindow__text">{props.specialistId}</p>
                    </div>

                </div>
                {jobDone || isCanceled ? leaveCommentBlock : null}
            </div>
        )
    }
    return (
        <>
            {topComponent}
        </>
    )
}

export default SpecialitsWindowStatus;