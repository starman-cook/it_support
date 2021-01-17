import React from 'react';
import AuthenticationModal from '../../Components/UserLoginPageComponents/AuthenticationModal/AuthenticationModal';
import HelperInfo from '../../Components/UserLoginPageComponents/HelperInfo/HelperInfo';
import LoginForm from '../../Components/UserLoginPageComponents/LoginForm/LoginForm';


const UserLoginPage = () => {

    let loginContent;
    let question;
    let link;
    let textLink;
    let contacts;


    question = "Не помните данные для входа? ";
    link = "#";
    textLink = "Оставьте заявку в чат-боте WatsApp";
    contacts = "или позвоните на +7 707 390 11 12, и мы восстановим ваш логин и пароль.";
    loginContent = (
        <LoginForm 
            title={"Личный кабинет клиента"}
            // submit
            // loginOnChange
            // passwordOnChange
            // checkOnChange
            buttonName={"войти"}
            buttonWidth={"142"}
            // refCheckbox
        />
    )

    return (
        <div>
            <AuthenticationModal>
                {loginContent}
            </AuthenticationModal>
            <HelperInfo 
                question={question}
                link={link}
                textLink={textLink}
                contacts={contacts}
                instagram={"#"}
                facebook={"#"}
                linkedin={"#"}
                youtube={"#"}
            />
        </div>
    )
}

export default UserLoginPage;