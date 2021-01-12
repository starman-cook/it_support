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

    const department = "Удаленная поддержка"; // Получить по id
    const subject = 'Не работает почта'; // Получить по id
    const message = 'Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что это началось после того // Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что это началось после того  // ни не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что это началось после того // Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что эт после '; // Получить по id
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

    let centerComponent;

     // possible statusses 'new' 'in_progress' 'complete' 'canceled'
    if (status === 'new') {
        centerComponent = (
        <div className="ApplecationDetails">
            <h2 className="ApplecationDetails__title">Детали заявки</h2>
            <div className="ApplecationDetails__head">
                <div className="ApplecationDetails__head--sides">
                    <p className="ApplecationDetails__text--title">Ответсвенный отдел</p>
                    <p className="ApplecationDetails__text">{department}</p>
                </div>
                <div className="ApplecationDetails__head--sides">
                    <p className="ApplecationDetails__text--title">Тема</p>
                    <p className="ApplecationDetails__text">{subject}</p>
                </div>
            </div>
                <p className="ApplecationDetails__text--title">Подробности</p>
            <div className={messageClassToggle}>
                <p className="ApplecationDetails__text">{message}</p>
                <div onClick={textShowToggle} className="ApplecationDetails__message--button"><span className="ApplecationDetails__text">... </span>{messageClassButtonText}</div>
            </div>
                <textarea value={oneComment} placeholder="Если вы хотите дополнить заявку, напишите комментарий" onChange={(event) => {textAreaHandler(event)}} className="ApplecationDetails__textarea"></textarea>
                <div className="ApplecationDetails__btn">
                    <BlueButton 
                        name="Отправить сообщение"
                        clicked={() => {applyComment()}}
                    />
                </div>
                {allComments}
        </div>
        )}

    return (
        <>
            {centerComponent}
        </>
    )
}


export default ApplicationDetails;