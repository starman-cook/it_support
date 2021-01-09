import React from 'react';
import BlueButton from '../BlueButton/BlueButton';
import './ApplicationForm.css';

const ApplicationForm = (props) => {
    return (
        <div className="ApplicationForm">
            <h2 className="ApplicationForm__title">{props.greetings}</h2>
            <form>
                <h4 className="ApplicationForm__inputTitle">{props.subjectTitle}</h4>
                <input className="ApplicationForm__input" type="text" name={props.subjectName} onChange={props.subjectChange} required={props.subjectRequired} placeholder={props.subjectPlaceholder} />
                <h4 className="ApplicationForm__inputDepartment">{props.departmentTitle}</h4>
                <input className="ApplicationForm__input" type="text" name={props.departmentName} onChange={props.departmentChange} required={props.departmentRequired} placeholder={props.departmentPlaceholder} />
                <h4 className="ApplicationForm__inputMessage">{props.messageTitle}</h4>
                <textarea className="ApplicationForm__inputMessage" type="text" name={props.messageName} onChange={props.messageChange} required={props.messageRequired} placeholder={props.messagePlaceholder}></textarea>
                
                <div className="ApplicationForm__downloadBlock">
                    <input className="ApplicationForm__inputFile" type="file" onClick={props.fileClicked} ref={props.fileRef} />
                    <div className="ApplicationForm__fileIcon" onClick={props.iconClick} />
                    <p className="ApplicationForm__fileName" onClick={props.iconClick}>{props.fileName}</p>
                    <div className="ApplicationForm__question" onClick={props.questionClick} />
                </div>

                <h2 className="ApplicationForm__teamViewerTitle">{props.textTeamViewer}</h2>
            
                <div className="ApplicationForm__teamViewer-block">
                    <div className="ApplicationForm__teamViewer-combine">
                        <input className="ApplicationForm__inputPassword" type={props.passwordType} name={props.passwordName} onChange={props.passwordChange} required={props.passwordRequired} placeholder={props.passwordPlaceholder} />
                        <div className="ApplicationForm__eye" onClick={props.showPassword} />
                    </div>
                    <BlueButton 
                        name={props.buttonName}
                        clicked={props.buttonClicked}
                        disabled={props.disabled}
                    />
                </div>
            </form>
        </div>
    )
}

export default ApplicationForm;