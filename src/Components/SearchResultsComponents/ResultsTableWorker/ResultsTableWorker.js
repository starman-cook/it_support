import React, { useState, useEffect } from 'react';
import ModalWorker from '../ModalWorker/ModalWorker';
import ModalDepartment from '../ModalDepartment/ModalDepartment';
import ModalStatus from '../ModalStatus/ModalStatus';
import NoResults from '../NoResults/NoResults';
import ResultsItemWorker from './ResultsItemWorker/ResultsItemWorker';
import './ResultsTableWorker.css';
import {useDispatch, useSelector} from "react-redux";
import FullApplicationInfo from "../FullApplicationInfo/FullApplicationInfo";
import {
    changePagination,
    getTenApplications,
    setActiveFilters, setActivePage
} from "../../../Store/ApplicationsReducer/applicationsActions";
import {getAllDepartments, getAllEmployees} from "../../../Store/CompanyDataReducer/companyActions";

const ResultsTableWorker = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.applications.data);


    useEffect(() => {
        dispatch(getTenApplications(data));
    }, [data]);


    const [indexForModal, setIndexForModal] = useState();
    let allApplications;
    const company = useSelector(state => state.company.companyData);

    useEffect(() => {
        if (company) {
            dispatch(getAllDepartments(company.departments));
            if (company.director) {
                dispatch(getAllEmployees(company.director.employees));
            }
        }
    }, [company]);
    // В редаксе будут хранится фильтры, по отдельности статус и отдел, все что будет выбрано в модальном окне попдает в стэйт и иконка закрашивается в черный
    const isFilterStatus = useSelector(state => state.applications.data['filter'].status.length > 0);
    const isFilterDepartment = useSelector(state => state.applications.data['filter'].departament.length > 0);
    const isFilterWorker = useSelector(state => state.applications.data['filter'].employee.trim() !== '');
    const filters = useSelector(state => state.applications.data['filter']);
    const isFilterDate = useSelector(state => state.applications.isFilterDateActive)

    let filtersCheck = {
        isFilterStatus: useSelector(state => state.applications.data['filter'].status.length > 0) ? "статус" : null,
        isFilterDepartment: useSelector(state => state.applications.data['filter'].departament.length > 0) ? "отдел" : null,
        isFilterWorker: useSelector(state => state.applications.data['filter'].employee.trim() !== '') ? "сотрудник" : null,
        isFilterNumber: useSelector(state => state.applications.data['filter'].number !== '') ? "id заявки" : null,
        isFilterDate: useSelector(state => state.applications.isFilterDateActive ? "дата" : null)
    }

    const showFilters = () => {
        let arr = [];
        Object.keys(filtersCheck).forEach(el => {
            if (filtersCheck[el]) {
                arr.push(filtersCheck[el]);
            }
        })
        dispatch(setActiveFilters(arr));

    };
    useEffect(() => {
        showFilters();
    }, [filters, isFilterDate]);


    const [isStatusModal, setIsStatusModal] = useState(false);
    const [isDepartmentModal, setIsDepartmentModal] = useState(false);
    const [isWorkerModal, setIsWorkerModal] = useState(false);
    const [isFullInfoModal, setIsFullInfoModal] = useState((false));

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
        setIsFullInfoModal(!isFullInfoModal);

    }
    const applications = useSelector(state => state.applications.applications);

    if (applications ? applications.length : null) {
        allApplications = applications.map((el, i) => {

            const status = el.status;
            const solution = el.outcome.substring(0, 50) + "...";
            return <ResultsItemWorker
                        key={el._id}
                        isLastFrame={applications.length - 1 === i}
                        statusColor={status === 'Запланировано' ? "#E82024" : status === 'В работе' ? "#F3BB1C" : status === 'Завершено' ? "#3CC13B" : status === 'Отменено' ? '#828282' : null}
                        date={el.dateCreate}
                        status={status.toLowerCase()}
                        subject={el.subject}
                        department={el.departament}
                        specialist={el.implementer['name']}
                        specialistId={el.implementer['id']}
                        contentShort={solution}
                        index={i}
                        classLikeDislike={el.rating['value'] === 1 ? "like" : el.rating['value'] === -1 ? "dislike" : ''}
                        isComment={el.rating['comment']}
                        openSeeDetails={() => {seeFullApplicationInfo(i)}}
                        isDirector={!!company.director}
                        workerId={el.employee['id']}
                        worker={el.employee['name']}
                        commentMessage={el.rating.commentstr}
                    />
        });
    }else {
        allApplications = (
            <NoResults />
        )
    }

    const currentPage = useSelector(state => state.applications.data['start']);
    useEffect(() => {
        dispatch(setActivePage((currentPage + 10) / 10));
        if (indexForModal >=9) {
            setIndexForModal(0);
        }
        if (indexForModal <=0) {
            setIndexForModal(9);
        }
    }, [currentPage]);

    const goLeft = async () => {

        if (indexForModal <= 0 && currentPage === 0) return;

            if (indexForModal <=0) {
                await dispatch(changePagination(currentPage - 10));
                return
            }
            const index = indexForModal - 1;
            setIndexForModal(index);
    };
    const activePage = useSelector(state => state.applications.activePage)
    const count = useSelector(state => state.applications.count);
    const goRight = async () => {
        if (indexForModal >= applications.length - 1 && activePage >= Math.ceil(count / 10)) return;

            if (indexForModal >=9) {
                await dispatch(changePagination(currentPage + 10));
                return
            }
            const index = indexForModal + 1;
            setIndexForModal(index);
    };



    return (
        <div className="ResultsTableWorker">
            <div className="ResultsTableWorker__filtersBlock">

                <div className="ResultsTableWorker__filterWithIcon ResultsTableWorker__filter--status">
                    <p className="ResultsTableWorker__filterText">Дата/статус</p>
                     {isStatusModal ? <ModalStatus close={toggleStatusModal} /> : null}
                    <div onClick={toggleStatusModal} className={`ResultsTableWorker__filterIcon ${isFilterStatus ? "ResultsTableWorker__filterIcon--active" : null}`} />
                </div>

                {company.director ? <div className="ResultsTableWorker__filterWithIcon ResultsTableWorker__filter--worker">
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
                        clickToClose={() => {seeFullApplicationInfo(indexForModal)}}
                        application={applications[indexForModal]}
                        goLeft={goLeft}
                        goRight={goRight}
                        first={indexForModal <= 0 && currentPage === 0}
                        last={indexForModal >= applications.length - 1 && activePage >= Math.ceil(count / 10)}
                        commentMessage={applications[indexForModal] ? applications[indexForModal].rating.commentstr : ""}
                    />
                </>:
                null}
            {allApplications}
        </div>
    )
}



export default ResultsTableWorker;