import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, NavLink } from 'react-router-dom';
// import './Navigation.scss';
import NavBar from './NavBar';
import UserContext from "../auth/UserContext";
import Login from '../homepage/Login';
import ProfilePage from '../profiles/ProfilePage';
import SignUpForm from '../homepage/SignUpForm';
import AllPlatesAdd from '../plates/AllPlatesAdd';

function Navigation(params) {
    const { currentUser, 
            setCurrentUser, 
            plateIds, 
            setPlateIds, 
            login, logout, signUp } = useContext(UserContext);

    return (
        <div className='Navigation'>
            <BrowserRouter>
                <NavBar logout={logout}/>
                <Routes> {/* replaces <Switch> in v6*/ }
                    <Route exact="true" path="/" element={
                        <>
                        {console.debug('In Navigation.js -> / route')}
                        { !currentUser ?
                        <div className="Navigation-home">
                            <h1>Foodyuh</h1>
                            <p>Make and analyze your plate.</p>
                            <p>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Sign Up</NavLink>
                            </p>
                        </div> :
                        <Navigate replace to="/user/profile" />
                        }
                        </>
                    }/>
                    <Route exact="true" path="/login" element={
                        <>
                        <Login login={login}/>
                        </>
                    }/>
                    <Route exact="true" path="/signup" element={
                        <>
                        <SignUpForm signUp={signUp}/>
                        </>
                    }/>
                    <Route exact="true" path="/plates" element={
                        currentUser ? <AllPlatesAdd /> : <Navigate replace to="/" />
                    }/>
                    {/* <Route exact="true" path="/plates/addfood" element={
                        currentUser ? <AddFoodList /> : <Navigate replace to="/" />
                    }/>
                    <Route path="/plates/:plateId" element={
                        currentUser ? <PlateDetail /> : <Navigate replace to="/" />
                    } /> */}
                    <Route path="/user/profile" element={
                        <>
                        {console.debug('In Navigation.js -> /user/profile')}
                        
                        {currentUser ? <ProfilePage /> : <Navigate replace to="/" />}
                        </>
                    } />
                    <Route path="*" element={<Navigate replace to="/" />} />
                    {/*
                        When no other route matches the URL, you can render a "not found"
                        route using path="*". This route will match any URL, but
                        will have the weakest precedence so the router will only pick it
                        if no other routes match.
                    */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Navigation;