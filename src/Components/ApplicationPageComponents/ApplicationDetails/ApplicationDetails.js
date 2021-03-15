import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addComment } from '../../../Store/ApplicationsReducer/applicationsActions';
import BlueButton from '../BlueButton/BlueButton';
import './ApplicationDetails.css';
import {addDetailsToApplicationInProcess} from "../../../Store/ApplicationsReducer/applicationsActions";


const ApplicationDetails = (props) => {

    const status = props.status;
    // const id = props.id;
    const dispatch = useDispatch();
    // const comments = useSelector(state => state.applications.comments); //Получить все комментарии по ID
    const [messageClassToggle, setMessageClassToggle] = useState("messageClassToggleHidden");
    const [messageClassButtonText, setMessageClassButtonText] = useState('показать подробнее');

    const [resultClassToggle, setResultClassToggle] = useState("messageClassToggleHidden");
    const [resultClassButtonText, setResultClassButtonText] = useState('показать подробнее');
    // const applicationHash = useSelector(state => state.applications.newApplicationHash)

    let jobDone = props.jobDone;
    let isCanceled = props.isCanceled;

    const department = props.department; // Получить по id
    const subject = props.subject; // Получить по id
    const message = props.message;
    const result = props.result;
    // let allComments;
    // if (comments) {
    //     allComments = (
    //         comments.map(el => {
    //             return <div
    //                 key={el.id}
    //                 className="Comment"
    //             >
    //                 <p className="Comment__date">{`${el.date}`}</p>
    //                 <p className="Comment__content">{`${el.content}`}</p>
    //             </div>
    //         })
    // )}


    const textShowToggle = () => {
        if (messageClassToggle === 'messageClassToggleHidden') {
            setMessageClassToggle('messageClassToggleOpen');
            setMessageClassButtonText('скрыть текст');
        } else {
            setMessageClassToggle('messageClassToggleHidden');
            setMessageClassButtonText('показать подробнее');
        }
    }
    const resultShowToggle = () => {
        if (resultClassToggle === 'messageClassToggleHidden') {
            setResultClassToggle('messageClassToggleOpen');
            setResultClassButtonText('скрыть текст');
        } else {
            setResultClassToggle('messageClassToggleHidden');
            setResultClassButtonText('показать подробнее');
        }
    }

    let centerComponent;

     // possible statusses 'new' 'in_progress' 'complete' 'canceled'
    if (status === 'new') {
        centerComponent = (
        <div className="ApplicationDetails">
            <h2 className="ApplicationDetails__title">Детали заявки {props.idInTitle}</h2>
            <div className="ApplicationDetails__head">
                <div className="ApplicationDetails__head--sides">
                    <p className="ApplicationDetails__text--title">Ответственный отдел</p>
                    <p className="ApplicationDetails__text">{department}</p>
                </div>
                <div className="ApplicationDetails__head--sides">
                    <p className="ApplicationDetails__text--title">Тема</p>
                    <p className="ApplicationDetails__text">{subject}</p>
                </div>
            </div>
                <p className="ApplicationDetails__text--title">Подробности</p>
            <div className={messageClassToggle}>
                <div dangerouslySetInnerHTML={{__html: `<p className="ApplicationDetails__text">${message}<p>`}} className="ApplicationDetails__text" ></div>
                {props.showDetailsButton ? <div onClick={textShowToggle} className="ApplicationDetails__message--button"><span className="ApplicationDetails__text">... </span>{messageClassButtonText}</div> : null}
            </div>
            {jobDone || isCanceled
                    ?
                <>
                     <p className="ApplicationDetails__text--title">Результат</p>
                    <div className={resultClassToggle}>
                        <p className="ApplicationDetails__text">{result}</p>
                        {props.showResultButton ? <div onClick={resultShowToggle} className="ApplicationDetails__message--button"><span className="ApplicationDetails__text">... </span>{resultClassButtonText}</div> : null}
                    </div>
                </>
                    :
                <>
                    <textarea value={props.oneComment} placeholder="Если вы хотите дополнить заявку, напишите комментарий" onChange={props.onChangeComment} className="ApplicationDetails__textarea" />
                    <div className="ApplicationDetails__btn">
                        <BlueButton 
                            name="Отправить сообщение"
                            clicked={props.submitComment}
                        />
                    </div>
                    {/*{allComments}*/}
                </> 
            }
        </div>
        )}

    return (
        <>
            {centerComponent}
        </>
    )
}


export default ApplicationDetails;