import React, { useState, useContext } from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import UserContext from "../auth/UserContext";
import './ProfilePage.scss';
import { useNavigate } from "react-router-dom";
import FoodyuhApi from "../foodyuhApi";

function ProfilePage() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();

    function addplates(params) {//maybe move this to another component
        
    }
    function editForm() {
        return (
            <>
                <form onSubmit={onFormSubmit}>
                    <p>Edit Your Info:</p>
                    <div>
        
                        <label htmlFor="firstName">First Name</label><br/>
                        <input type="firstName" id="firstName" name="firstName"
                        value={formData.firstName} onChange={handleFormChange}/><br/>
        
                        <label htmlFor="lastName">Last Name</label><br/>
                        <input type="lastName" id="lastName" name="lastName"
                        value={formData.lastName} onChange={handleFormChange}/><br/>
        
                        <label htmlFor="email">Email</label><br/>
                        <input type="email" id="email" name="email"
                        value={formData.email} onChange={handleFormChange}/><br/>
                        
                        <label htmlFor="password">New Password</label><br/>
                        <input type="password" id="password" name="password"
                        value={formData.password} onChange={handleFormChange}/><br/>

                        <input className="submit" type="submit" id="submit" name="submit" value="Confirm Changes"/>
                    </div>
                </form>
            </>
        )
    }

    return (
        <div className="ProfilePage">
            <div className="ProfilePage-user">
                <p>User Name: {currentUser.username}</p>
                <p>First Name: {currentUser.firstName}</p>
                <p>Last Name: {currentUser.lastName}</p>
                <p>Email: {currentUser.email}</p>
                <p>Admin Status: {currentUser.isAdmin ? `Yes` : `No`}</p>
            </div>
            <div className="ProfilePage-form">
                {editForm()}
            </div>
        </div>
    );
}

export default ProfilePage;
