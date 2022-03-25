import './App.scss';
import jwt from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Navigation from './nav/Navigation';
import FoodyuhApi from './foodyuhApi';
import UserContext from './auth/UserContext';
import LoadingSpinner from './LoadingSpinner';

export const TOKEN_STORAGE_ID = 'foodyuh-token';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [userInfoUpdated, setUserInfoUpdated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  const [plateIds, setPlateIds] = useState([]);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    'App',
    'infoLoaded=',
    infoLoaded,
    'currentUser=',
    currentUser,
    'token=',
    token
  ); //maybe take off eventually

  async function signUp(userObj) {
    try {
      let token = await FoodyuhApi.register(userObj);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  /** Handles site-wide login. */
  async function login(username, password) {
    try {
      let token = await FoodyuhApi.login(username, password);
      setToken(token);

      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  /** Function to logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  useEffect(() => {
    console.debug('App useEffect loadUserInfo', 'token=', token);

    const getCurrentUser = async () => {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          FoodyuhApi.token = token;
          let currentUser = await FoodyuhApi.getCurrentUser(username);

          setCurrentUser(currentUser);

          setPlateIds(currentUser.plates);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    };

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token, userInfoUpdated]);

  if (!infoLoaded)
    return (
      <div className='App loading'>
        <LoadingSpinner />
      </div>
    );

  return (
    <UserContext.Provider
      value={{
        userInfoUpdated,
        setUserInfoUpdated,
        currentUser,
        setCurrentUser,
        plateIds,
        setPlateIds,
        login,
        logout,
        signUp,
        setShowMessage,
        showMessage,
      }}
    >
      <div className='App'>
        <Navigation logout={logout} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
