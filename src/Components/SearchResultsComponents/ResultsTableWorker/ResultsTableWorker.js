import React, { useState, useEffect } from 'react';
import ModalWorker from '../ModalWorker/ModalWorker';
import ModalDepartment from '../ModalDepartment/ModalDepartment';
import ModalStatus from '../ModalStatus/ModalStatus';
import NoResults from '../NoResults/NoResults';
import ResultsItemWorker from './ResultsItemWorker/ResultsItemWorker';
import './ResultsTableWorker.css';
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router'
import FullApplicationInfo from "../FullApplicationInfo/FullApplicationInfo";
import {getTenApplications} from "../../../Store/ApplicationsReducer/applicationsActions";

const ResultsTableWorker = (props) => {
    const dispatch = useDispatch();

    // const body = {
    //     clientId: "1267-02-00020",
    //     hash: "68ace46062c33b61ac87a05e44a48198",
    //     filter: {
    //         date: {
    //             from: "20200101",
    //             to: "20201231 "
    //         },
    //         status: [],
    //         employee: " ",
    //         departament: [],
    //         number: ""
    //     },
    //     limit: 10,
    //     start: 0
    // }
    const data = useSelector(state => state.applications.data);

    useEffect(() => {
        dispatch(getTenApplications(data));
    }, [data]);


    const [indexForModal, setIndexForModal] = useState();
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
    const [isFullInfoModal, setIsFullInfoModal] = useState((false));
    const [oneApplication, setOneApplication] = useState({});

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
    const seeFullApplicationInfo = (index) => {
        setIndexForModal(index)
        setOneApplication(applications[index]);
        setIsFullInfoModal(!isFullInfoModal);
        // Здесь делаем запрос на сервер через диспатч и созраняем в редаксе полную инфу одной заявки
    }
    const applications = useSelector(state => state.applications.applications);

    if (applications !== null) {
        allApplications = applications.map((el, i) => {

            const status = el.status;
            const solution = el.outcome.substring(0, 50) + "...";
                    return <ResultsItemWorker
                        key={el._id}
                        isLastFrame={applications.length - 1 === i}
                        statusColor={status === 'Запланировано' ? "#E82024" : status === 'В работе' ? "#F3BB1C" : status === 'Завершено' ? "#3CC13B" : status === 'Отменено' ? '#828282' : null}
                        date={el.dateCreate}
                        status={status}
                        subject={el.subject}
                        department={el.departament}
                        specialist={el.implementer['name']}
                        specialistId={el.implementer['id']}
                        contentShort={solution}
                        index={i}
                        classLikeDislike={el.rating['value'] === 1 ? "like" : "dislike"}
                        isComment={el.rating['comment']}
                        openSeeDetails={() => {seeFullApplicationInfo(i)}}
                        isDirector={user.role === 'director'}
                        workerId={el.employee['id']}
                        worker={el.employee['name']}
                    />
        });
    }else {
        allApplications = (
            <NoResults />
        )
    }
    // if (applications.length > 0) {
    //     allApplications = applications.map((el, i) => {
    //
    //         const solution = el.solution.substring(0, 50) + "...";
    //         return <ResultsItemWorker
    //             key={i}
    //             isLastFrame={applications.length - 1 === i}
    //             statusColor={el.status === 'запланировано' ? "#E82024" : el.status === 'в работе' ? "#F3BB1C" : el.status === 'завершено' ? "#3CC13B" : el.status === 'отменено' ? '#828282' : null}
    //             date={el.date}
    //             status={el.status}
    //             subject={el.subject}
    //             department={el.department}
    //             specialist={el.specialist}
    //             specialistId={el.specialistId}
    //             contentShort={solution}
    //             index={i}
    //             classLikeDislike={el.classLikeDislike}
    //             isComment={el.isComment}
    //             openSeeDetails={() => {seeFullApplicationInfo(i)}}
    //             isDirector={user.role === 'director'}
    //             workerId={el.workerId}
    //             worker={el.worker}
    //         />
    //     });
    // } else {
    //     allApplications = (
    //         <NoResults />
    //     )
    // }

    const goLeft = () => {
        // потом будет проверка на то что если start в оффсете будет 0 и индекс 0 тогда стоп.
        const index = indexForModal - 1;
        setIndexForModal(index);
        setOneApplication(applications[index]);
    };
    const goRight = () => {
        const index = indexForModal + 1;
        setIndexForModal(index);
        setOneApplication(applications[index]);
    };



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
            {isFullInfoModal ?
                <>
                <div className="FullInfoModalBg" onClick={() => {seeFullApplicationInfo(indexForModal)}} />
                    <FullApplicationInfo
                        // index={idForModal}
                        clickToClose={() => {seeFullApplicationInfo(indexForModal)}}
                        application={oneApplication}
                        goLeft={goLeft}
                        goRight={goRight}
                    />
                </>:
                null}
            {allApplications}
        </div>
    )
}


export default ResultsTableWorker;