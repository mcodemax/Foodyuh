import React, { useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  NavLink,
} from 'react-router-dom';
import './Navigation.scss';
import NavBar from './NavBar';
import UserContext from '../auth/UserContext';
import Login from '../homepage/Login';
import ProfilePage from '../profiles/ProfilePage';
import SignUpForm from '../homepage/SignUpForm';
import AllPlatesAdd from '../plates/AllPlatesAdd';
import PlateDetails from '../plates/PlateDetails';

function Navigation(params) {
  const {
    currentUser,
    login,
    logout,
    signUp,
  } = useContext(UserContext);

  return (
    <div className='Navigation'>
      <BrowserRouter>
        <NavBar logout={logout} />
        <Routes>
          <Route
            exact='true'
            path='/'
            element={
              <>
                {console.debug('In Navigation.js -> / route')}
                {!currentUser ? (
                  <div className='Navigation-home'>
                    <h1>Foodyuh</h1>
                    <p>Make and analyze your plate.</p>
                    <img src="./logoFood.png" alt="Girl in a jacket"></img>
                    <p>
                      <NavLink to='/login'>Login</NavLink>
                    </p>
                    <p>
                      <NavLink to='/signup'>Sign Up</NavLink>
                    </p>
                  </div>
                ) : (
                  <Navigate replace to='/user/profile' />
                )}
              </>
            }
          />
          <Route
            exact='true'
            path='/login'
            element={
              <>
                <Login login={login} />
              </>
            }
          />
          <Route
            exact='true'
            path='/signup'
            element={
              <>
                <SignUpForm signUp={signUp} />
              </>
            }
          />
          <Route
            exact='true'
            path='/plates'
            element={
              currentUser ? <AllPlatesAdd /> : <Navigate replace to='/' />
            }
          />
          <Route
            path='/plates/:plateId'
            element={
              currentUser ? <PlateDetails /> : <Navigate replace to='/' />
            }
          />
          <Route
            path='/user/profile'
            element={
              <>
                {console.debug('In Navigation.js -> /user/profile')}

                {currentUser ? <ProfilePage /> : <Navigate replace to='/' />}
              </>
            }
          />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navigation;
