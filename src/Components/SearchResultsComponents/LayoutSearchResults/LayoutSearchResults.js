import React, {useEffect} from 'react';
import './LayoutSearchResults.css';
import {push} from 'connected-react-router';
import {useDispatch, useSelector} from "react-redux";
import {
    changeNumber, clearMyInterval,
    initFilters, inputFilterDateFrom, inputFilterDateTo, isFilterDateActive,
    setActiveFilters,
    setActivePage
} from "../../../Store/ApplicationsReducer/applicationsActions";



const LayoutSearchResults = (props) => {
    const dispatch = useDispatch();
    const company = useSelector(state => state.company.companyData);

    const goToApplications = () => {
        if (company.employee) {
            dispatch(push(`/application/${company.employee.id}/new`));
        } else if (company.director) {
            dispatch(push(`/application/${company.director.id}/new`));
        }
    }
    useEffect(() => {
        dispatch(clearMyInterval())
    }, [])
    const inputValue = (event) => {
        dispatch(changeNumber(event.target.value));
        dispatch(setActivePage(1));
    }
    const initFiltersHandler = async () => {
        localStorage.removeItem('employeeFilterName');
        await dispatch(initFilters());
        await dispatch(isFilterDateActive(false));
        await dispatch(inputFilterDateFrom(""));
        await dispatch(inputFilterDateTo(""));
        await dispatch(setActiveFilters([]));
        await dispatch(setActivePage(1))
        const el = document.getElementsByClassName('LayoutSearchResults__btnDate');
        for (let i = 0; i < el.length; i++) {
            el[i].style.color = '#E34A4E';
            el[i].style.background = 'white';
        }
    }

    return (
        <div className="LayoutSearchResults">
            <header className="LayoutSearchResults__header">
                <div onClick={goToApplications} className="LayoutSearchResults__logo" />
                <div className="LayoutSearchResults__contactPhoneBlock">
                    <h2 className="LayoutSearchResults__boldText">+7 727 390 11 12</h2>
                    <p className="LayoutSearchResults__headerHelperText LayoutSearchResults__headerHelperText--left">???????????? ?????????????????? ??????????????????????????</p>
                </div>
                <div className="LayoutSearchResults__idHeaderBlock">
                    <h2 className="LayoutSearchResults__boldText LayoutSearchResults__boldText--center">{props.equipmentId}</h2>
                    <p className="LayoutSearchResults__headerHelperText">ID ????????????????????????</p>
                </div>
                <div className="LayoutSearchResults__NameBlock">
                    <h2 className="LayoutSearchResults__bigNotBoldText">{props.workerName}</h2>
                    {!company.director ? <p className="LayoutSearchResults__headerHelperText">???????????????????? ????????</p> : null}
                </div>
                <div className="LayoutSearchResults__CompanyBlock">
                    <h2 className="LayoutSearchResults__bigNotBoldText">{props.companyName}</h2>
                    <p className="LayoutSearchResults__headerHelperText">???????????????????????? ??????????????????????</p>
                </div>
                <div className="LayoutSearchResults__companyLogo" style={{background: `url(data:image/jpg;base64,${props.companyLogo})center / contain no-repeat`}} />
            </header>
            
            <div className="LayoutSearchResults__dateEngine">
                <div className="LayoutSearchResults__buttonsBlock">
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate LayoutSearchResults__btnDate--left">??????????????</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">??????????</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">????????????</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">??????????</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">??????????????</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate">??????????????????</div>
                    <div onClick={props.dateEngineClick} className="LayoutSearchResults__btnDate LayoutSearchResults__btnDate--right">????????????</div>
                </div>

                <div className="LayoutSearchResults__idDateBlock">
                    <p className="LayoutSearchResults__hashKey">#</p>
                    <input placeholder="?????????? ???? ???????????? ????????????" className="LayoutSearchResults__idInput" type="text" onChange={(event) => {inputValue(event)}} />
                    
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
                <p className="LayoutSearchResults__footerText">??????????????:</p>
                {props.isFilter ?
                    <div className="LayoutSearchResults__filters">
                        {props.filters}
                        <p onClick={initFiltersHandler} className="LayoutSearchResults__resetText">???????????????? ?????? ??????????????</p>
                    </div>
                    :
                    <p className="LayoutSearchResults__footerText">?????????????? ???? ????????????????</p>
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