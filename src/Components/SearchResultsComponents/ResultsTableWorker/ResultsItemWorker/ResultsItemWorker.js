import React, { useState } from 'react';
import './ResultsItemWorker.css';


const ResultsItemWorker = (props) => {
   
    const [showQuestion, setShowQuestion] = useState(false);
    const hoverShowQuestion = () => {
        setShowQuestion(true);
    }
    const hoverHideQuestion = () => {
        setShowQuestion(false);
    }

    const toggleSeeDetailsRed = (event) => {
        const el = document.getElementsByClassName('ResultsItemWorker__seeDetails');
        for (let i = 0; i < el.length; i++) {
            if (i === props.index) {
                if (el[i].style.display === 'block') {
                        el[i].style.display = 'none';
                } else {
                    el[i].style.display = 'block';
                }
            } else {
                el[i].style.display = 'none';
            }
        }
    }

    return (
        <div onClick={(event) => {toggleSeeDetailsRed(event)}} className={`ResultsItemWorker ${ props.isLastFrame ? "ResultsItemWorker--last" : null}`}>
            <div className="ResultsItemWorker_statusDateBlock">
                <p className="ResultsItemWorker__text">{props.date}</p>
                <p style={{background: props.statusColor}} className="ResultsItemWorker__status">{props.status}</p>
            </div>
            <div className="ResultsItemWorker__subjectBlock">
                <p className="ResultsItemWorker__text">{props.subject}</p>
            </div>
            <div className="ResultsItemWorker__departmentBlock">
                <p className="ResultsItemWorker__text">{props.department}</p>
            </div>
            <div className="ResultsItemWorker__specialistIdBlock">
                <p className="ResultsItemWorker__text">{props.specialist}</p>
                <p className="ResultsItemWorker__id">{props.specialistId}</p>
            </div>
            <div className="ResultsItemWorker__resultBlock">
                <p className="ResultsItemWorker__text ResultsItemWorker__text--pushRight">{props.contentShort}</p>
                
                <div style={{paddingTop: '14px'}} className="ResultsItemWorker__resultBlock--icons">
                    <div className={`ResultsItemWorker__icon--widthLikeDislike ResultsItemWorker__icon--${props.classLikeDislike}`} />
                        <div className={`${props.isComment ? "ResultsItemWorker__comment" : null} ResultsItemWorker__comment--width`} onMouseEnter={props.isComment ? hoverShowQuestion: null} onMouseLeave={props.isComment ? hoverHideQuestion : null}>
                            <div style={showQuestion ? {"display" : "block"} : {"display" : "none"}} className="ResultsItemWorker__comment--modal">
                                <p className="ResultsItemWorker__comment--modal-text">Пользователь оставил коментарий к этой задаче, для того чтобы посмотреть его проскрольте описание заявки до конца.</p>
                            </div>
                        </div> 
                </div> 
                <div onClick={props.openSeeDetails} className="ResultsItemWorker__seeDetails">
                    <p  className="ResultsItemWorker__seeDetails--text">смотреть детали заявки</p>
                </div> 
            </div>
        </div>
    )
}


export default ResultsItemWorker;