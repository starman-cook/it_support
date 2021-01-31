import React, { useState } from 'react';
import ModalWorker from '../ModalWorker/ModalWorker';
import ModalDepartment from '../ModalDepartment/ModalDepartment';
import ModalStatus from '../ModalStatus/ModalStatus';
import NoResults from '../NoResults/NoResults';
import ResultsItemWorker from './ResultsItemWorker/ResultsItemWorker';
import './ResultsTableWorker.css';
import { useHistory } from 'react-router';


const ResultsTableWorker = (props) => {
    const history = useHistory();


    let allApplications;
    const user = {
        role: 'director'
    }
    // ResultsTableWorker__filterIcon--active
    // В редаксе будут хранится фильтры, по отдельности статус и отдел, все что будет выбрано в модальном окне попдает в стэйт и иконка закрашивается в черный
    const isFilterStatus = true;
    const isFilterDepartment = false;
    const isFilterWorker = false;

    const [isStatusModal, setIsStatusModal] = useState(false);
    const [isDepartmentModal, setIsDepartmentModal] = useState(false);
    const [isWorkerModal, setIsWorkerModal] = useState(false);


    const toggleStatusModal = () => {
        setIsStatusModal(!isStatusModal);
        setIsDepartmentModal(false);
        setIsWorkerModal(false);
    }
    const toggleDepartmentModal = () => {
        setIsDepartmentModal(!isDepartmentModal);
        setIsStatusModal(false);
        setIsWorkerModal(false);
    }
    const toggleWorkerModal = () => {
        setIsWorkerModal(!isWorkerModal);
        setIsStatusModal(false);
        setIsDepartmentModal(false);
    }
    const goToSeeFullApplicationInfo = (id) => {
        history.push(`/fullinfo/${id}`)
    }
    // Болванки для демонстрации списка, потом заменить на полученные данные с сервера
    const applications = [
    {
        date: "03. 11. 2019, 10:50",
        status: "запланировано",
        subject:"Най",
        department: "Уа",
        specialist: "Ана",
        specialistId:"IT",
        content: "Б ",
        classLikeDislike: "like",
        isComment: true,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    },{
        date: "03. 11. 2019, 10:50",
        status: "в работе",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: null,
        isComment: false,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }, {
        date: "03. 11. 2019, 10:50",
        status: "завершено",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: null,
        isComment: true,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }, {
        date: "03. 11. 2019, 10:50",
        status: "отменено",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "dislike",
        isComment: true,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }, {
        date: "03. 11. 2019, 10:50",
        status: "запланировано",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "like",
        isComment: false,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
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
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }, {
        date: "03. 11. 2019, 10:50",
        status: "в работе",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: null,
        isComment: false,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }, {
        date: "03. 11. 2019, 10:50",
        status: "завершено",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: null,
        isComment: true,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }, {
        date: "03. 11. 2019, 10:50",
        status: "отменено",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "dislike",
        isComment: true,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }, {
        date: "03. 11. 2019, 10:50",
        status: "запланировано",
        subject:"Не работает вайфай",
        department: "Удаленная поддержка",
        specialist: "Александра Панарина",
        specialistId:"IT 152",
        content: "Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом Были введены неправи льные настройки VPN. Исправили настройки на каждом ",
        classLikeDislike: "like",
        isComment: false,
        comment: 'Comment',
        worker: 'Примерный рабочий',
        workerId: "ID 3245875"
    }
];
    // END OF SAMPLES


    if (applications.length > 0) {
        allApplications = applications.map((el, i) => {

            const content = el.content.substring(0, 50) + "...";
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
                contentShort={content}
                index={i}
                classLikeDislike={el.classLikeDislike}
                isComment={el.isComment}
                openSeeDetails={() => {goToSeeFullApplicationInfo(i)}}
                isDirector={user.role === 'director'}
                workerId={el.workerId}
                worker={el.worker}
            />
        });
    } else {
        allApplications = (
            <NoResults />
        )
    }





    return (
        <div className="ResultsTableWorker">
            <div className="ResultsTableWorker__filtersBlock">

                <div className="ResultsTableWorker__filterWithIcon ResultsTableWorker__filter--status">
                    <p className="ResultsTableWorker__filterText">Дата/статус</p>
                     {isStatusModal ? <ModalStatus close={toggleStatusModal} /> : null}
                    <div onClick={toggleStatusModal} className={`ResultsTableWorker__filterIcon ${isFilterStatus ? "ResultsTableWorker__filterIcon--active" : null}`} />
                </div>

                {user.role === 'director' ? <div className="ResultsTableWorker__filterWithIcon ResultsTableWorker__filter--worker">
                    <p className="ResultsTableWorker__filterText">Сотрудник</p>
                     {isWorkerModal ? <ModalWorker close={toggleWorkerModal} /> : null}
                    <div onClick={toggleWorkerModal} className={`ResultsTableWorker__filterIcon ${isFilterWorker ? "ResultsTableWorker__filterIcon--active" : null}`} />
                </div> : null}

                <p className="ResultsTableWorker__filterText ResultsTableWorker__filter--subject">Тема</p>
                
                <div className="ResultsTableWorker__filterWithIcon ResultsTableWorker__filter--department">
                    <p className="ResultsTableWorker__filterText">Отдел</p>
                    {isDepartmentModal ? <ModalDepartment close={toggleDepartmentModal} /> : null}
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