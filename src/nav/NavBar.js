import React, {useContext} from "react";
import UserContext from "../auth/UserContext";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";

const NavBar = ({logout}) => {
    const { currentUser } = useContext(UserContext);

    function showLoggedIn() {
        return (
            <>
                <NavLink to="/user/profile" className="navbar-brand">
                    Foodyuh
                </NavLink>

                <NavLink to="/plates">Plates</NavLink>                
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/" onClick={logout}>Log out</NavLink>
            </>
        )    
    }

    function showLoggedOut() {
        return (
            <>
                <NavLink to="/" className="navbar-brand">
                    Foodyuh
                </NavLink>
                
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        )    
    }

    return (
        <div className="NavBar">
            { currentUser ? showLoggedIn() : showLoggedOut() }
        </div>            
    );
}

export default NavBar;