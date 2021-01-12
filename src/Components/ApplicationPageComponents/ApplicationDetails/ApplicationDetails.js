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

    const department = "Удаленная поддержка"; // Получить по id
    const subject = 'Не работает почта'; // Получить по id
    const message = 'Отправляю письма, а они не доходят до получателей, адреса ввожу правильно. Отчеты о возврате письма не приходят, то есть письмо вроде ушло, но в отправленных его нет, и когда узнаешь, пришло письмо или не пришло, то получатель говорит, что никакого письма не получал. Хочу заметить, что это началось после того...'; // Получить по id
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

    let centerComponent;

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
                <p className="ApplecationDetails__text">{message}</p>

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