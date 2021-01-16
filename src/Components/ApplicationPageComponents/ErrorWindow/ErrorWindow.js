import React from 'react';
import './ErrorWindow.css';

const ErrorWindow = () => {
    return (
        <div className="ErrorWindow">
            <div className="ErrorWindow__container">
                <h1 className="ErrorWindow__title">Что-то пошло не так</h1>
                <p className="ErrorWindow__text">Страница не загружается. Не отчаивайтесь!</p>
                <p className="ErrorWindow__text">Вы можете оставить заявку в приложении <a href="#" className="ErrorWindow__link">TeamViewer</a> или по телефону:</p>
              
                <div className="ErrorWindow__contacts">
                    <div className="ErrorWindow__contactSide">
                        <p className="ErrorWindow__phone">+7 727 390 11 12</p>
                        <p className="ErrorWindow__city">в Алматы</p>
                    </div>
                    <div className="ErrorWindow__contactSide">
                        <p className="ErrorWindow__phone">+7 717 264 61 12</p>
                        <p className="ErrorWindow__city">в Нур-Султане</p>
                    </div>
                </div>
                <div className="ErrorWindow__socialNetwork">
                    <p className="ErrorWindow__textSocial">Мы в социальных сетях</p>
                    <a href="#" className="ErrorWindow__icon ErrorWindow__icon--instagram"></a>
                    <a href="#" className="ErrorWindow__icon ErrorWindow__icon--facebook"></a>
                    <a href="#" className="ErrorWindow__icon ErrorWindow__icon--linkedin"></a>
                    <a href="#" className="ErrorWindow__icon ErrorWindow__icon--youtube"></a>
                </div>
            </div>
        </div>
    )
}

export default ErrorWindow;