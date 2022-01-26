import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUpForm.scss';

/** generates signup form
 * I: signUp function to change state of logged in or not
 * { username, password, firstName, lastName, email }
 */
const SignUpForm = ({ signUp }) => {
    const emptyForm = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };

    const [formData, setFormData] = useState(emptyForm);
    // const [signUpErrors, setSignUpErrors] = useState([]); //not implemented

    const navigate = useNavigate();
    
    const handleFormChange = (evt) => {
        const {name, value} = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }
    //https://reactjs.org/docs/uncontrolled-components.html

    const onFormSubmit = async (evt) => {
        evt.preventDefault();
        let { 
            username,
            password,
            firstName,
            lastName,
            email
        } = evt.target;
        
        username = username.value;
        password = password.value;
        firstName = firstName.value;
        lastName = lastName.value;
        email = email.value;
        // console.log({username, password, firstName, lastName, email})

        // currently no err handling for incompletes or invalids
        //no implentation for actual database changes.
        // menus are reset on app resets
        
        const res = await signUp({username, password, firstName, lastName, email})
    
        if (res.success) {
            navigate("/companies");  //change to nav to a profile info page prob
        } else {
            // setSignUpErrors(res.errors);//not implemented
            alert(res.errors)
            setFormData(emptyForm);
        }

        
    };


    return (
        <>
            <form className="SignUpForm" onSubmit={onFormSubmit}>
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="username" name="username"
                 value={formData.username} onChange={handleFormChange}/><br/>

                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password" name="password"
                 value={formData.password} onChange={handleFormChange}/><br/>

                <label htmlFor="firstName">First Name</label><br/>
                <input type="firstName" id="firstName" name="firstName"
                 value={formData.firstName} onChange={handleFormChange}/><br/>

                <label htmlFor="lastName">Last Name</label><br/>
                <input type="lastName" id="lastName" name="lastName"
                 value={formData.lastName} onChange={handleFormChange}/><br/>

                <label htmlFor="email">Email</label><br/>
                <input type="email" id="email" name="email"
                 value={formData.email} onChange={handleFormChange}/><br/>
                
                <button type="submit" id="submit" name="submit" >Sign Up</button>
            </form>
        </>
    )
}

export default SignUpForm;