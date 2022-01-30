import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUpForm.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


/** generates signup form
 * I: signUp function to change state of logged in or not
 * { username, password, firstName, lastName, email }
 */
const SignUpForm = ({ signUp }) => {
    const [signUpErrors, setSignUpErrors] = useState([]); //not implemented
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object({
        username: Yup.string().min(1).max(25, 'Username cannot exceed 25 characters').required("Required"),
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
        console.debug('In SignUpForm.js, onSubmit')
        console.log("Form Data: ", values);//comment out later so password not revealed
        

        //a copy of values object is made so this component does not become uncontrolled
        const valuesCopy = {...values}
        delete valuesCopy.confirmPassword; 

        const res = await signUp(valuesCopy);

        if(res.success){
            navigate("/user/profile"); 
        }else{
            setSignUpErrors(res.errors)//trouble shoot later how to actuallyy display these properly
            resetForm({});
        }
        //if login fail show error message and navigate back2Login

        // https://github.com/jaredpalmer/formik/issues/446
    };

    return (
        <>
            <div className="SignUpForm">
                { signUpErrors.length ? 
                    signUpErrors.map(error => {
                        return (
                            <div className="SignUpForm-failed">{error}</div> 
                        )
                    })
                    : ``
                }
                <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >   
                        <>
                        {/* Formik component can only have one child. */}
                        <p>SIGN UP!</p>
                        <Form className={`SignUpForm-form`}>
                            <div className={`SignUpForm-username`}>
                                <label htmlFor="username">Username</label>
                                <Field type="text" id="username" name="username" />
                                <ErrorMessage name="username"  />
                            </div>
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
                            <div className={`SignUpForm-password`}>
                                <label htmlFor="password">Password</label>
                                <Field type="password" id="password" name="password" />
                                <ErrorMessage name="password"  />
                            </div>
                            <div className={`SignUpForm-confirmPassword`}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field type="password" id="confirmPassword" name="confirmPassword" />
                                <ErrorMessage name="confirmPassword"  />
                            </div>
                            <button type="submit" id="submit">Submit</button>
                        </Form>
                        </>
                </Formik>
            </div>
        </>
    )
}

export default SignUpForm;