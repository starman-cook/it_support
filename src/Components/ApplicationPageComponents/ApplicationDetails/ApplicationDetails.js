import React from 'react';
import './ApplicationDetails.css';


const ApplicationDetails = (props) => {

    const status = props.status;
    const id = props.id;


    let centerComponent;

    if (status === 'new') {
        centerComponent = (
        <div>
            NEW DETAILS
            <h1>asfafasff</h1>
        </div>
        )}

    return (
        <>
            {centerComponent}
        </>
    )
}


export default ApplicationDetails;