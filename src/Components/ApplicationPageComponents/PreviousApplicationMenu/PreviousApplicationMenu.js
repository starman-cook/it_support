import React from 'react';
import RedButton from '../RedButton/RedButton';
import './PreviousApplicationMenu.css';

const PreviousApplicationMenu = (props) => {
    return (
        <div className="PreviousApplicationMenu">
            <h3 className="PreviousApplicationMenu__title">{props.title}</h3>
            <div className="PreviousApplicationMenu__line" />
            <p className="PreviousApplicationMenu__date">{props.date}</p>
            <div className="PreviousApplicationMenu__name_check">
                <p className="PreviousApplicationMenu__name">{props.name}</p>
                <div className="PreviousApplicationMenu__check" />
            </div>
            <p className="PreviousApplicationMenu__description">{props.description}</p>
            <RedButton 
                name={props.buttonName}
                clicked={props.clicked}
            />
        </div>
    )
}

export default PreviousApplicationMenu;