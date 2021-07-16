import React, { useState } from 'react';
import BlueButton from '../BlueButton/BlueButton';
import './ApplicationDetails.css';


const ApplicationDetails = (props) => {

    const [messageClassToggle, setMessageClassToggle] = useState("messageClassToggleHidden");
    const [messageClassButtonText, setMessageClassButtonText] = useState('показать подробнее');

    const [resultClassToggle, setResultClassToggle] = useState("messageClassToggleHidden");
    const [resultClassButtonText, setResultClassButtonText] = useState('показать подробнее');

    let jobDone = props.jobDone;
    let isCanceled = props.isCanceled;

    const department = props.department;
    const subject = props.subject;

    const message = props.message.split("\n").join("<br />")
    const result = props.result;


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
            <div className={message.trim().length > 100 ? messageClassToggle : "messageClassToggleHidden--empty"}>
                <div dangerouslySetInnerHTML={{__html: `<p className="ApplicationDetails__text">${message}<p>`}} className="ApplicationDetails__text--block" />
                {props.showDetailsButton ? <div onClick={textShowToggle} className="ApplicationDetails__message--button"><span className="ApplicationDetails__text">... </span>{messageClassButtonText}</div> : null}
            </div>
            {jobDone
                    ?
                <>
                     <p className="ApplicationDetails__text--title">Результат</p>
                    <div className={result.trim().length > 100 ? resultClassToggle : "messageClassToggleHidden--empty"}>
                        <p className="ApplicationDetails__text">{result}</p>
                        {props.showResultButton ? <div onClick={resultShowToggle} className="ApplicationDetails__message--button"><span className="ApplicationDetails__text">... </span>{resultClassButtonText}</div> : null}
                    </div>
                </>
                    :
                isCanceled ?
                    <>
                        <p className="ApplicationDetails__text--title">Причины отмены заявки</p>
                        <div className={result.trim().length > 100 ? resultClassToggle : "messageClassToggleHidden--empty"}>
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
                </>
            }
        </div>
        )
// }

    return (
        <>
            {centerComponent}
        </>
    )
}


export default ApplicationDetails;