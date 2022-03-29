import React from "react";
import { render } from "@testing-library/react";
import PlateDetails from "./PlateDetails";
import UserContext from '../auth/UserContext';
import { act } from "@testing-library/react";
import ReactDOM from 'react-dom';

const currentUserDummy = {
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
            <UserContext.Provider value={{currentUser: currentUserDummy}}>
                <PlateDetails />
            </UserContext.Provider>
        ), container);
    });
});
