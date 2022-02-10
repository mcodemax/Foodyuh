import React, { useState, useContext } from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from "../auth/UserContext";
// import './AllPlatesAdd.scss';
import { useNavigate } from "react-router-dom";
import FoodyuhApi from "../foodyuhApi";
import { v4 as uuidv4 } from 'uuid';

function AllPlatesAdd() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [changeInfoErrors, setChangeInfoErrors] = useState([]); //implement later
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
        newPassword: "",
        newPasswordConfirm: ""
    };  //add if statements and validation later and check password = username.password or somethin
        //for backend, then delete password and newPaswordconfirm on object
        //make sure in the compoenent newPassword and newPassword are optional if left blank!!!

    const validationSchema = Yup.object({
        firstName: Yup.string().min(1).max(255, 'Max first name length is 255 characters').notRequired().default(undefined),
        lastName: Yup.string().min(1).max(255, 'Max last name length is 255 characters').notRequired().default(undefined),
        email: Yup.string().email('Must be a valid email').min(1).max(255, 'Max email length is 255 characters').notRequired().default(undefined),
        newPassword: Yup.string().min(5).max(255, 'Max password length is 255 characters').notRequired().default(undefined),
        newPasswordConfirm: Yup.string().when("newPassword", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("newPassword")],
              "Both passwords need to match"
            )
        })
    });

    const onSubmit = async (values, {resetForm}) => {

        //a copy of values object is made so this component does not become uncontrolled
        const valuesCopy = {...values}

        //workaround for yup validation not accepting circular refs; 
        //if newPassword exists make sure newPasswordConfirm exists as well
        if(valuesCopy.newPassword && !valuesCopy.newPasswordConfirm){
            setChangeInfoErrors(['Please confirm new password to change it']);//trouble shoot later how to actuallyy display these properly
            return;
        }

        //alters info change data to fit FoodyuhApi.editUserInfo allowed input
        if(valuesCopy.newPassword){
            valuesCopy.password = valuesCopy.newPassword;
            delete valuesCopy.newPassword;
            delete valuesCopy.newPasswordConfirm;
        }

        for(let value in valuesCopy){
            if(!valuesCopy[value]) delete valuesCopy[value];
        }

        const res = await FoodyuhApi.editUserInfo(currentUser.username, valuesCopy);

        if(res.success){
            //maybe add state to display success banner after changing info
            navigate("/user/profile"); 
            //bug: there's no state change after altering user info
        }else{
            setChangeInfoErrors(res.errors)//trouble shoot later how to actuallyy display these properly
            resetForm({});
        }
        //if login fail show error message and navigate back2Login

        // https://github.com/jaredpalmer/formik/issues/446
    };
    
    return (
        <div className="AllPlatesAdd">
            <div className="AllPlatesAdd-user">
                <p>User Name: {currentUser.username}</p>
                <p>First Name: {currentUser.firstName}</p>
                <p>Last Name: {currentUser.lastName}</p>
                <p>Email: {currentUser.email}</p>
                <p>Admin Status: {currentUser.isAdmin ? `Yes` : `No`}</p>
            </div>
            <div className="AllPlatesAdd-form">
                {/* {editForm()} */}
            </div>

            {/* implement plate addition component; PlatesView */}

            <div className="AllPlatesAdd-form">
                { changeInfoErrors.length ? 
                    changeInfoErrors.map(error => {
                        return (
                            <div className="Login-failed" key={uuidv4()}>{error}</div> 
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
                    <p>Add a plate!</p>
                    <Form className={`AllPlatesAdd-form-password`}>
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
                        <div className={`AllPlatesAdd-form-new-password`}>
                            <label htmlFor="newPassword">New Password (optional)</label>
                            <Field type="password" id="newPassword" name="newPassword" autoComplete="off"/>
                            <ErrorMessage name="newPassword"  />
                        </div>
                        <div className={`AllPlatesAdd-form-new-password-confirm`}>
                            <label htmlFor="newPasswordConfirm">Confirm New Password</label>
                            <Field type="password" id="newPasswordConfirm" name="newPasswordConfirm" autoComplete="off"/>
                            <ErrorMessage name="newPasswordConfirm"  />
                        </div>
                        <button type="submit" id="submit">Submit</button>
                    </Form>
                    </>
                </Formik>
                
            </div>
        </div>
        
    );
}

export default AllPlatesAdd;
