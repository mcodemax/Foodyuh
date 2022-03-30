import React from "react";
import ProfilePage from "./ProfilePage";
import UserContext from '../auth/UserContext';
import { act } from "@testing-library/react";
import ReactDOM from 'react-dom';

const currentUserDummy = {
    username: 'dummy',
    firstName: 'dummy',
    lastName: 'dummy',
    isAdmin: 'dummy',
    email: 'dummy',
    plates: [
        {
            name: 'dummyname',
            id: 1,
            description: 'dummydesc'
        }
    ]
}

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it("renders without crashing", function () {
    act(() => {
        ReactDOM.render((
            <UserContext.Provider value={{currentUser: currentUserDummy, setUserInfoUpdated: false, setShowMessage: null, showMessage: null}}>
                <ProfilePage />
            </UserContext.Provider>
        ), container);
    });
});
