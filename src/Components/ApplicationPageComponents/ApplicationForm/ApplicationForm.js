import React from 'react';
import { useSelector } from 'react-redux';
import BlueButton from '../BlueButton/BlueButton';
import './ApplicationForm.css';

const ApplicationForm = (props) => {

    const departments = useSelector(state => state.applications.departments);

    let options = (
        departments.map(el => {
            return <option
            key={el}
            >{el}</option>
        })
    ) 

    return (
        <div className="ApplicationForm">
            <h2 className="ApplicationForm__title"><span className="ApplicationForm__title-name">{props.userName}</span>, {props.greetings}</h2>
            <form onSubmit={props.submitClicked}>
                <h4 className="ApplicationForm__inputTitle">{props.subjectTitle}</h4>
                <input className="ApplicationForm__input" type="text" name={props.subjectName} onChange={props.subjectChange} required={props.subjectRequired} placeholder={props.subjectPlaceholder} />
                
                
                <h4 className="ApplicationForm__inputTitle">{props.departmentTitle}</h4>
                
                <div className="ApplicationForm__input-select--block">
                    <select defaultValue={'DEFAULT'} className="ApplicationForm__input ApplicationForm__input-select" type="text" name={props.departmentName} onChange={props.departmentChange} required={props.departmentRequired}>
                        <option value="DEFAULT" disabled className="ApplicationForm__input-optionDefault">{props.departmentPlaceholder}</option>
                        {options}
                    </select>
                </div>
                
                
                <h4 className="ApplicationForm__inputTitle">{props.messageTitle}</h4>
                <textarea className="ApplicationForm__inputMessage" type="text" name={props.messageName} onChange={props.messageChange} required={props.messageRequired} placeholder={props.messagePlaceholder} />
                
                <div className="ApplicationForm__downloadBlock">
                    <input className="ApplicationForm__inputFile" type="file" onChange={props.fileClicked} ref={props.fileRef} name={props.inputFileName} />
                    <div className="ApplicationForm__fileIcon" onClick={props.iconClick} />
                    <p className="ApplicationForm__fileName" onClick={props.iconClick}>{props.fileName}</p>
                    <div className="ApplicationForm__question" onMouseEnter={props.questionShow} onMouseLeave={props.questionHide}>
                    <div style={props.showQuestionModal ? {"display" : "block"} : {"display" : "none"}} className="ApplicationForm__question--modal"><p className="ApplicationForm__question--modal-text">{props.questionText}</p></div>
                    </div>
                </div>

                <h2 className="ApplicationForm__teamViewerTitle">{props.textTeamViewer}</h2>
            
                <div className="ApplicationForm__teamViewer-block">
                    <div className="ApplicationForm__teamViewer-combine">
                        <input className="ApplicationForm__inputPassword" type={props.showPassword ? "text" : "password"} name={props.passwordName} onChange={props.passwordChange} required={props.passwordRequired} placeholder={props.passwordPlaceholder} />
                        <div className="ApplicationForm__eye" onClick={props.toggleShowPassword} />
                    </div>
                    <BlueButton 
                        name={props.buttonName}
                        type="submit"
                        isDisabled={props.isDisabled}
                    />
                </div>
            </form>
        </div>
    )
}

export default ApplicationForm;