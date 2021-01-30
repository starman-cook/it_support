import React, { useState } from 'react';
import ModalDepartment from '../ModalDepartment/ModalDepartment';
import ModalStatus from '../ModalStatus/ModalStatus';
import ResultsItemWorker from './ResultsItemWorker/ResultsItemWorker';
import './ResultsTableWorker.css';


const ResultsTableWorker = (props) => {



    let allApplications;
  
    // ResultsTableWorker__filterIcon--active
    // В редаксе будут хранится фильтры, по отдельности статус и отдел, все что будет выбрано в модальном окне попдает в стэйт и иконка закрашивается в черный
    const isFilterStatus = true;
    const isFilterDepartment = false;

    const [isStatusModal, setIsStatusModal] = useState(false);
    const [isDepartmentModal, setIsDepartmentModal] = useState(false);

    const toggleStatusModal = () => {
        setIsStatusModal(!isStatusModal);
        alert('test, this will be modal status')
    }
    const toggleDepartmentModal = () => {
        setIsDepartmentModal(!isDepartmentModal);
        alert('test, this will be modal department')
    }
    
    // Болванки для демонстрации списка, потом заменить на полученные данные с сервера
    const applications = [{
        date: "03. 11. 2019, 10:50",
        status: "запланировано",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "like",
        isComment: true,
        comment: 'Comment',
    }, {
        date: "03. 11. 2019, 10:50",
        status: "в работе",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "like",
        isComment: true,
        comment: 'Comment',
    }, {
        date: "03. 11. 2019, 10:50",
        status: "завершено",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "like",
        isComment: true,
        comment: 'Comment',
    }, {
        date: "03. 11. 2019, 10:50",
        status: "отменено",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "like",
        isComment: true,
        comment: 'Comment',
    }, {
        date: "03. 11. 2019, 10:50",
        status: "запланировано",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "like",
        isComment: true,
        comment: 'Comment',
    }];
    // END OF SAMPLES


    if (applications) {
        allApplications = applications.map((el, i) => {
            return <ResultsItemWorker 
                key={i}
                isLastFrame={applications.length - 1 === i}
                statusColor={el.status === 'запланировано' ? "#E82024" : el.status === 'в работе' ? "#F3BB1C" : el.status === 'завершено' ? "#3CC13B" : el.status === 'отменено' ? '#828282' : null}
                date={el.date}
                status={el.status}
                subject={el.subject}
                department={el.department}
                specialist={el.specialist}
                specialistId={el.specialistId}
                contentShort={"asd"}
                index={i}
                classLikeDislike={el.classLikeDislike}
                isComment={el.isComment}
                openSeeDetails={() => {alert('MODAL TO SEE DETAILS')}}
            />
        });
    }





    return (
        <div className="ResultsTableWorker">
            {/* <ModalDepartment /> */}
            {/* <ModalStatus /> */}
            <div className="ResultsTableWorker__filtersBlock">
                <div className="ResultsTableWorker__filterWithIcon ResultsTableWorker__filter--status">
                    <p className="ResultsTableWorker__filterText">Дата/статус</p>
                    <div onClick={toggleStatusModal} className={`ResultsTableWorker__filterIcon ${isFilterStatus ? "ResultsTableWorker__filterIcon--active" : null}`} />
                </div>
                <p className="ResultsTableWorker__filterText ResultsTableWorker__filter--subject">Тема</p>
                <div className="ResultsTableWorker__filterWithIcon ResultsTableWorker__filter--department">
                    <p className="ResultsTableWorker__filterText">Отдел</p>
                    <div onClick={toggleDepartmentModal} className={`ResultsTableWorker__filterIcon ${isFilterDepartment ? "ResultsTableWorker__filterIcon--active" : null}`} />
                </div>
                <p className="ResultsTableWorker__filterText ResultsTableWorker__filter--specialist">ИТ-специалист</p>
                <p className="ResultsTableWorker__filterText ResultsTableWorker__filter--results">Результат</p>
            
            </div>

            {allApplications}
        </div>
    )
}


export default ResultsTableWorker;