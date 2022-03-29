import React from 'react';
import ReactDOM from 'react-dom';
import { act } from "@testing-library/react";
import AllPlatesAdd from './AllPlatesAdd'
import UserContext from '../auth/UserContext';


const currentUserDummy = {
    plates: [
        {
            name: 'dummyname',
            id: 1,
            description: 'dummydesc'
        }
    ]
}

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
}));

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
                currentUser: currentUserDummy,
                setUserInfoUpdated: null,
                userInfoUpdated: null
            }}>
                <AllPlatesAdd />
            </UserContext.Provider>
        ), container);
    });
});
