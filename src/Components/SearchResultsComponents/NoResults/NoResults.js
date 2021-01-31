import React from 'react';
import './NoResults.css';


const NoResults = () => {
    return (
        <div className="NoResults">
            <div className="NoResults__content">
                <div className="NoResults__ring" />
                <h2 className="NoResults__title">Ничего не найдено.</h2>
            </div>
        </div>
    )
}


export default NoResults;