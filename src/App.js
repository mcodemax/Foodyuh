import logo from './logo.svg';
import './App.css';
import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
// import Navigation from "./routes-nav/Navigation";
// import Routes from "./routes-nav/Routes";
import FoodyuhApi from './foodyuhApi';



// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "foodyuh-token";

//make api call back end for token, store token as state
function App() {
  console.log(FoodyuhApi.getImages('fight78t67gbyv7658').then(e => console.log(e)))

  // const [infoLoaded, setInfoLoaded] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  // // ^store credentials in state
  // const [jobIds, setJobIds] = useState([]);
  // const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // console.debug(
  //   "App",
  //   "infoLoaded=", infoLoaded,
  //   "currentUser=", currentUser,
  //   "token=", token,
  // );

  // /** Handles site-wide login.
  //  *
  //  * Make sure you await this function and check its return value!
  //  */
  // async function login(username, password) {
  //   try {
  //     let token = await //JoblyApi.login(username, password);
  //     setToken(token);
  //     return { success: true };
  //   } catch (errors) {
  //     console.error("login failed", errors);
  //     return { success: false, errors };
  //   }
  // }

  //  // Load user info from API. Until a user is logged in and they have a token,
  // // this should not run. It only needs to re-run when a user logs out, so
  // // the value of the token is a dependency for this effect.

  
  // useEffect(function loadUserInfo() {
  //   console.debug("App useEffect loadUserInfo", "token=", token);

  //   async function getCurrentUser() {
  //     if (token) {
  //       try {
  //         let { username } = jwt.decode(token);
  //         // put the token on the Api class so it can use it to call the API.
  //         FoodyuhApi.token = token;
  //         let currentUser = await FoodyuhApi.getCurrentUser(username);
  //         setCurrentUser(currentUser);
  //         setApplicationIds(new Set(currentUser.applications));// turn this into plate ids and 
  //         //possibly fdcIds
  //       } catch (err) {
  //         console.error("App loadUserInfo: problem loading", err);
  //         setCurrentUser(null);
  //       }
  //     }
  //     setInfoLoaded(true);
  //   }

  //   // set infoLoaded to false while async getCurrentUser runs; once the
  //   // data is fetched (or even if an error happens!), this will be set back
  //   // to false to control the spinner.
  //   setInfoLoaded(false);
  //   getCurrentUser();
  // }, [token]);


  return (
    <div className="App">
      <header className="App-header">
        {/* <Navigation logout={logout} />
        <Routes login={login} signup={signup} /> */}
      </header>
    </div>
  );
}

export default App;
