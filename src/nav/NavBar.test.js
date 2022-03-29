import React from 'react';
import ReactDOM from 'react-dom';
import { act } from '@testing-library/react';
import NavBar from './NavBar';
import UserContext from '../auth/UserContext';
import { BrowserRouter } from 'react-router-dom';

const currentUserDummy = {
  name: 'testuser',
};

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', function () {
  act(() => {
    ReactDOM.render(
      //dummy values where userInfo related state passed in for this test
      <UserContext.Provider value={{ currentUser: currentUserDummy }}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </UserContext.Provider>,
      container
    );
  });
});
