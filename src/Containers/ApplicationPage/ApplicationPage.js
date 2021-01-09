import React from 'react';
import { Switch } from 'react-router';
import ApplicationForm from '../../Components/ApplicationPageComponents/ApplicationForm/ApplicationForm';
import LayoutApplicationPage from '../../Components/ApplicationPageComponents/LayoutApplicationPage/LayoutApplicationPage';
import PreviousApplicationMenu from '../../Components/ApplicationPageComponents/PreviousApplicationMenu/PreviousApplicationMenu';


const ApplicationPage = () => {


    let isBackInProgress = false;
    let buttonName ="";
    const id_number = "№IT-051120-0375649";
    const date = "03.11.2019, 10:50";
    const name = "Не работает вай-фай";
    let description = "";
    const title = "Предыдущая заявка";
    let center;


    if (isBackInProgress) {
        description = `Заявка ${id_number} вернулась в работу, ИТ-специалист свяжется с вами в ближайшее время`;
        buttonName = "Посмотреть заявку в новом окне";
    } else {
        buttonName = "Вернуть в работу";
    }

    let leftSide = (
        <PreviousApplicationMenu 
            title={title}
            name={name}
            date={date}
            description={description}
            buttonName={buttonName}
            clicked
        />
    )

    center = (
        <ApplicationForm 
            buttonClicked={alert("ustal")}
        />
    )

    return (
        <LayoutApplicationPage
            left={leftSide}
            center={center}
        >
            <Switch>

            </Switch>
        </LayoutApplicationPage>
    )
}

export default ApplicationPage;