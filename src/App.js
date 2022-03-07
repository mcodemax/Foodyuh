import './App.scss';
import jwt from 'jsonwebtoken';
import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Navigation from './nav/Navigation';
import FoodyuhApi from './foodyuhApi';
import UserContext from './auth/UserContext';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = 'foodyuh-token';

//make api call back end for token, store token as state
function App() {
  // console.log(FoodyuhApi.getImages('fight78t67gbyv7658').then(e => console.log(e)))
  // console.log(FoodyuhApi.addPlate('linguini9', 'spicy meat bol').then(e => console.log(e)))
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [userInfoUpdated, setUserInfoUpdated] = useState(null); //used when plates are added or userinfo changed
  const [currentUser, setCurrentUser] = useState(null);
  const [showMessage, setShowMessage] = useState('');
  // ^store credentials in state
  const [plateIds, setPlateIds] = useState([]); // maybe change to plateIds or food_plate ids
  /* this is a plate
      {
				"id": 3,
				"name": "Pasta3",
				"description": "for Engliand"
			}
  */
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    'App',
    'infoLoaded=',
    infoLoaded,
    'currentUser=',
    currentUser,
    'token=',
    token
  );

  /**
   * How to signUp:
   * example userObj:
   * { "username":"Fname1", "password":"passy1", "firstName":"Adam", "lastName":"Ant", "email":"Adam@smolboi.net" }
   *
   */
  async function signUp(userObj) {
    try {
      console.log('in signup', userObj);
      let token = await FoodyuhApi.register(userObj); //need2check if works
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(username, password) {
    try {
      let token = await FoodyuhApi.login(username, password);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
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
          // put the token on the Api class so it can use it to call the API.
          FoodyuhApi.token = token;
          let currentUser = await FoodyuhApi.getCurrentUser(username);

          console.debug('In App.js getCurrentUser', currentUser);
          setCurrentUser(currentUser);

          setPlateIds(currentUser.plates); // turn this into plate ids and
          //possibly fdcIds  //above might be redundant code
        } catch (err) {
          console.error('App loadUserInfo: problem loading', err);
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
  }, [token, userInfoUpdated]); //might need to update currentUser when updating plates/foods
  //bug above^ in ProfilePage component, this only runs once after initial form submissions
  // and no longer for submissions following the initial

  if (!infoLoaded) return <>{`WE LOADING`}</>;

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
        showMessage
      }}
    >
      <div className='App'>
          <Navigation logout={logout} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
