import React, { useState, useContext, useEffect } from 'react';
import UserContext from './auth/UserContext';

function Message(message) {
    const { setShowMessage, showMessage } = useContext(UserContext);

    return (
        <>
            <div className="Message">
                {showMessage}
            </div>
        </>
    )
}

export default Message;