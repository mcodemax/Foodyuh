import React, { useState, useContext } from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from "../auth/UserContext";
import './ProfilePage.scss';
import { useNavigate } from "react-router-dom";
import FoodyuhApi from "../foodyuhApi";

function ProfilePage() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    // const [changeInfoErrors, setChangeInfoErrors] = useState([]); //implement later
    const navigate = useNavigate();

    //show user details

    //show all plates with foods in them in mini panels
        //clicking on an indiv plate goes to PlateDetails

    //have button to go to a plate creation page
    
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        changepassword: ""
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().min(1).max(255, 'Max first name length is 255 characters').required("Required"),
        lastName: Yup.string().min(1).max(255, 'Max last name length is 255 characters').required("Required"),
        email: Yup.string().email('Must be a valid email').min(1).max(255, 'Max email length is 255 characters').required('Email is required'),
        password: Yup.string().min(5).max(255, 'Max password length is 255 characters').required("Required"),
        confirmPassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both passwords need to match"
            )
        })
    });

    const onSubmit = async (values, {resetForm}) => {

        console.log("Form Data: ", values);//comment out later so password not revealed
        
        const res = await login(values.username, values.password);

        if(res.success){
            navigate("/user/profile"); 
        }else{
            setChangeInfoErrors(res.errors)//trouble shoot later how to actuallyy display these properly
            resetForm({});
        }
        //if login fail show error message and navigate back2Login

        // https://github.com/jaredpalmer/formik/issues/446
    };
    
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
                {/* {editForm()} */}
            </div>



            <div className="ProfilePage-form">
                {/* { changeInfoErrors.length ? 
                    changeInfoErrors.map(error => {
                        return (
                            <div className="Login-failed">{error}</div> 
                        )
                    })
                    : ``
                } */}
                <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    // onSubmit={onSubmit}
                >   
                    <>
                    {/* Formik component can only have one child. */}
                    <p>Edit Your Info:</p>
                    <Form className={`ProfilePage-form-password`}>
                        <div className={`SignUpForm-firstName`}>
                            <label htmlFor="firstName">First Name</label>
                            <Field type="text" id="firstName" name="firstName" />
                            <ErrorMessage name="firstName"  />
                        </div>
                        <div className={`SignUpForm-lastName`}>
                            <label htmlFor="lastName">Last Name</label>
                            <Field type="text" id="lastName" name="lastName" />
                            <ErrorMessage name="lastName"  />
                        </div>
                        <div className={`SignUpForm-email`}>
                            <label htmlFor="email">Email</label>
                            <Field type="text" id="email" name="email" />
                            <ErrorMessage name="email"  />
                        </div>
                        <div className={`ProfilePage-form-password`}>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password"  />
                        </div>
                        <div className={`ProfilePage-form-changePassword`}>
                            <label htmlFor="changePassword">Confirm Password</label>
                            <Field type="password" id="changePassword" name="changePassword" />
                            <ErrorMessage name="changePassword"  />
                        </div>
                        <button type="submit" id="submit">Submit</button>
                    </Form>
                    </>
                </Formik>
                
            </div>
        </div>
        
    );
}

export default ProfilePage;
