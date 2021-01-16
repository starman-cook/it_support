import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../../Store/ApplicationPage/ApplicationPageActions';
import BlueButton from '../BlueButton/BlueButton';
import './ApplicationDetails.css';


const ApplicationDetails = (props) => {

    const status = props.status;
    const id = props.id;
    const dispatch = useDispatch();
    const comments = useSelector(state => state.ApplicationPage.comments); //Получить все комментарии по ID
    const [oneComment, setOneComment] = useState();
    const [messageClassToggle, setMessageClassToggle] = useState("messageClassToggleHidden");
    const [messageClassButtonText, setMessageClassButtonText] = useState('показать подробнее');

    const [resultClassToggle, setResultClassToggle] = useState("messageClassToggleHidden");
    const [resultClassButtonText, setResultClassButtonText] = useState('показать подробнее');

    let jobDone = props.jobDone;
    let isCanceled = props.isCanceled;


    const department = "Удаленная поддержка"; // Получить по id
    const subject = 'Не работает почта'; // Получить по id
    const message = 'Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что это началось после того // Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что это началось после того  // ни не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что это началось после того // Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что эт после '; // Получить по id
    const result = 'Были введены неправильные настройки VPN. Исправили настройки на каждом компьтере в отделе, почта снова работает. Почистили корпоративную почту от спама и рассылок. Просим вас регулярно приводить в порядок почтовое хранилище и избавляться от лишних файлов во избежание падения почтовых серверов... показать больше // Были введены неправильные настройки VPN. Исправили настройки на каждом компьтере в отделе, почта снова работает. Почистили корпоративную почту от спама и рассылок. Просим вас регулярно приводить в порядок почтовое хранилище и избавляться от лишних файлов во избежание падения почтовых серверов... показать больше';
    let allComments;
    if (comments) {
        allComments = (
            comments.map(el => {
                return <div
                    key={el.id}
                    className="Comment"
                >
                    <p className="Comment__date">{`${el.date}`}</p>
                    <p className="Comment__content">{`${el.content}`}</p>
                </div>
            })
    )}

    const textAreaHandler = (event) => {
        setOneComment(event.target.value);
    }
    const applyComment = () => {
        if (oneComment === undefined || oneComment.trim() === '') {
            return;
        }
        const obj = {
            id: Math.random(),
            date: new Date(),
            content: oneComment
        }
        dispatch(addComment(obj));
        setOneComment('');
    }
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
                <p className="ApplicationDetails__text">{message}</p>
                <div onClick={textShowToggle} className="ApplicationDetails__message--button"><span className="ApplicationDetails__text">... </span>{messageClassButtonText}</div>
            </div>
            {jobDone || isCanceled
                    ?
                <>
                     <p className="ApplicationDetails__text--title">Результат</p>
                    <div className={resultClassToggle}>
                        <p className="ApplicationDetails__text">{result}</p>
                        <div onClick={resultShowToggle} className="ApplicationDetails__message--button"><span className="ApplicationDetails__text">... </span>{resultClassButtonText}</div>
                    </div>
                </>
                    :
                <>
                    <textarea value={oneComment} placeholder="Если вы хотите дополнить заявку, напишите комментарий" onChange={(event) => {textAreaHandler(event)}} className="ApplicationDetails__textarea"></textarea>
                    <div className="ApplicationDetails__btn">
                        <BlueButton 
                            name="Отправить сообщение"
                            clicked={() => {applyComment()}}
                        />
                    </div>
                    {allComments}
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