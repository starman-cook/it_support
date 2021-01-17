import React from 'react';
import './AuthenticationModal.css';

const AuthenticationModal = (props) => {
    return (
        <div className="AuthenticationModal">
            <div className="AuthenticationModal__logo" />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default AuthenticationModal;