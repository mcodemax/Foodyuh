import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "@testing-library/react";
import Navigation from './Navigation'
import UserContext from '../auth/UserContext';

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
            //dummy values where userInfo related state passed in for this test
            <UserContext.Provider value={{
                currentUser: null,
                login: null,
                logout: null,
                signUp: null,}}>
                <Navigation />
            </UserContext.Provider>
        ), container);
    });
});
