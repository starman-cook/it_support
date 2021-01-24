import React, { useState } from 'react';
import LayoutSearchResults from '../../Components/SearchResultsComponents/LayoutSearchResults/LayoutSearchResults';
import './SearchResultsPage.css';

const SearchResultsPage = () => {

    const dateStart = 'ДД/ММ/ГГ';
    const dateEnd = 'ДД/ММ/ГГ';
    const  equipmentId = "175674";
    const workerName = "Сид Вишес";
    const companyName = "ТОО 'Секс Пистоллз'";
    const companyLogo = "https://transitiontownguildford.files.wordpress.com/2015/06/wall-e.jpg";
    const [showQuestion, setShowQuestion] = useState(false);
    const [dateBtnValue, setDateBtnValue] = useState("");
    // dateBtnValue Получаем текст из кнопки (вчера, месяц и прочее), потом с помощью условий выводим на экран результаты по выбраным датам
    const [calendarModal, setCalendarModal] = useState(false);


    const hoverShowQuestion = () => {
        setShowQuestion(true);
    }
    const hoverHideQuestion = () => {
        setShowQuestion(false);
    }

    const chooseDateBtnSimple = (event) => {
        const el = document.getElementsByClassName('LayoutSearchResults__btnDate');
        for (let i = 0; i < el.length; i++) {
            el[i].style.color = '#E34A4E';
            el[i].style.background = 'white';
        }
        event.target.style.color = 'white';
        event.target.style.background = '#E34A4E';
        setDateBtnValue(event.target.textContent);
        if (event.target.textContent === 'Период') {
            setCalendarModal(true);
        }
    }

    
    const closeModal = () => {
        setCalendarModal(false);
    }


    return (
            <LayoutSearchResults
                equipmentId={equipmentId}
                workerName={workerName}
                companyName={companyName}
                companyLogo={companyLogo}

                dateEngineClick={(event) => {chooseDateBtnSimple(event)}}
                datePeriodClick={(event) => {chooseDateBtnSimple(event)}}


                dateValueStart={dateStart}
                dateValueEnd={dateEnd}

                questionShow={hoverShowQuestion}
                questionHide={hoverHideQuestion}
                showQuestionModal={showQuestion}
                questionText={"Укажите регистрационный номер заявки для быстрого поиска"}
            >
                {calendarModal ? 
                <div onClick={closeModal} className="Modal__bg">
                    <div className="Modal">
                        MODAL
                    </div>
                </div> : null}
            </LayoutSearchResults>
    )
}

export default SearchResultsPage;