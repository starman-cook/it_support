import React from 'react';
import './LayoutSearchResults.css';


const LayoutSearchResults = (props) => {

    return (
        <div className="LayoutSearchResults">
            <header className="LayoutSearchResults__header">
                <div className="LayoutSearchResults__logo" />
                <div className="LayoutSearchResults__contactPhoneBlock">
                    <h2 className="LayoutSearchResults__boldText">+7 727 390 11 12</h2>
                    <p className="LayoutSearchResults__headerHelperText">служба поддержки пользователей</p>
                </div>
                <div className="LayoutSearchResults__idHeaderBlock">
                    <h2 className="LayoutSearchResults__boldText">{props.equipmentId}</h2>
                    <p className="LayoutSearchResults__headerHelperText">ID оборудования</p>
                </div>
                <div className="LayoutSearchResults__NameBlock">
                    <h2 className="LayoutSearchResults__bigNotBoldText">{props.workerName}</h2>
                    <p className="LayoutSearchResults__headerHelperText">контактное лицо</p>
                </div>
                <div className="LayoutSearchResults__CompanyBlock">
                    <h2 className="LayoutSearchResults__bigNotBoldText">{props.companyName}</h2>
                    <p className="LayoutSearchResults__headerHelperText">наименование организации</p>
                </div>
                <div className="LayoutSearchResults__companyLogo" style={{background: `url(${props.companyLogo})center / contain no-repeat`}} />
            </header>
            
            <div className="LayoutSearchResults__dateEngine">
                <div className="LayoutSearchResults__buttonsBlock">
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate LayoutSearchResults__btnDate--left">Сегодня</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">Вчера</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">Неделя</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">Месяц</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">Квартал</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">Полугодие</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate LayoutSearchResults__btnDate--right">Период</div>
                </div>

                <div className="LayoutSearchResults__idDateBlock">
                    <p className="LayoutSearchResults__hashKey">#</p>
                    <input placeholder="ПОИСК ПО НОМЕРУ ЗАЯВКИ" className="LayoutSearchResults__idInput" type="text" onChange={props.idInputOnChange} />
                    
                    <div className="LayoutSearchResults__question" onMouseEnter={props.questionShow} onMouseLeave={props.questionHide}>
                        <div style={props.showQuestionModal ? {"display" : "block"} : {"display" : "none"}} className="LayoutSearchResults__question--modal">
                            <p className="LayoutSearchResults__question--modal-text">{props.questionText}</p>
                        </div>
                    </div>
                </div>

                <div className="LayoutSearchResults__chooseDateBlock">
                        <div className="LayoutSearchResults__inputDate" >{props.dateValueStart}</div>
                        <p className="LayoutSearchResults__dash">-</p>
                        <div className="LayoutSearchResults__inputDate" >{props.dateValueEnd}</div>
                </div>

            </div>
            <main className="LayoutSearchResults__main">
                {props.children}
            </main>
            <footer className="LayoutSearchResults__footer">
                <p className="LayoutSearchResults__footerText">Фильтры:</p>
                {props.isFilter ?
                    <div className="LayoutSearchResults__filters">
                        {props.filters}
                        <p onClick={props.resetFilters} className="LayoutSearchResults__resetText">Сбросить все фильтры</p>
                    </div>
                    :
                    <p className="LayoutSearchResults__footerText">фильтры не включены</p>
                }
                {props.morePages ? 
                    <div className="LayoutSearchResults__paginationBlock">
                        <div onClick={props.paginationClickLeft} className="LayoutSearchResults__arrowBtn LayoutSearchResults__arrowBtn--left" />
                        <div onClick={props.paginationClickRight} className="LayoutSearchResults__arrowBtn LayoutSearchResults__arrowBtn--right" />
                    <div className="LayoutSearchResults__pagesNumbersBlock">
                        {props.pagesNumbers}
                    </div>
                    </div>
                : null}
            </footer>
        </div>
    )
}


export default LayoutSearchResults;