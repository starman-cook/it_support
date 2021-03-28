import React from 'react';
import './ApplicationStatus.css';


const ApplicationStatus = (props) => {
    const id = props.id;
    let leftSide;
    let specialistFound = props.specialistFound; //take from state?
    let jobDone = props.jobDone; //take from state?
    let isCanceled = props.isCanceled;

     // possible statusses 'new' 'in_progress' 'complete' 'canceled'
        leftSide = (
        <div className="ApplicationStatus">

            <div className="ApplicationStatus__lineBlock">
                <div className="ApplicationStatus__circle" />
                <div className={`ApplicationStatus__line ${specialistFound ? null : "ApplicationStatus__unactive--circle"}`} />
                <div className={`ApplicationStatus__circle ${specialistFound ? null : "ApplicationStatus__unactive ApplicationStatus__unactive--circle"}`}>{specialistFound ? null : "2"}</div>
                <div className={`ApplicationStatus__line ${jobDone || isCanceled ? null : "ApplicationStatus__unactive--circle"}`} />
                <div className={`ApplicationStatus__circle ${jobDone || isCanceled ? null : "ApplicationStatus__unactive ApplicationStatus__unactive--circle"} ${isCanceled ? "ApplicationStatus__canceled" : null}`}>{jobDone || isCanceled ? null : "3"}</div>
            </div>

            <div className="ApplicationStatus__textBlock">
                <div className="ApplicationStatus__textItem">
                    <h3 className="ApplicationStatus__title">Заявка в обработке</h3>
                    <p className="ApplicationStatus__text">Мы назначим ИТ-специалиста в ближайшее время. Обычно это занимает не больше 15 минут</p>
                </div>
                <div className="ApplicationStatus__textItem">
                    <h3 className={`ApplicationStatus__title ${specialistFound ? null : "ApplicationStatus__unactive"}`}>ИТ-специалист назначен</h3>
                    <p className={`ApplicationStatus__text ApplicationStatus__text--pushDown ${specialistFound ? null : "ApplicationStatus__unactive"}`}>Наш сотрудник скоро свяжется с вами и решит проблему</p>
                </div>
                {isCanceled 
                    ? 
                <div className="ApplicationStatus__textItem">
                    <h3 className="ApplicationStatus__title" >Заявка отменена</h3>
                    <p onClick={props.backInProgress} className="ApplicationStatus__link--whenCanceled">Вернуть заявку в работу</p>
                </div>
                    :
                <div className="ApplicationStatus__textItem">
                    <h3 className={`ApplicationStatus__title ${jobDone ? null : "ApplicationStatus__unactive"}`}>Заявка закрыта</h3>
                    <p className={`ApplicationStatus__text ${jobDone ? null : "ApplicationStatus__unactive"}`}>Поделитесь с нами обратной связью</p>
                </div>
            }
            </div>
        </div>
        );

    return (
        <>
            {leftSide}
        </>
    )
}

export default ApplicationStatus;