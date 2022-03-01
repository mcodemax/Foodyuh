import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

/** generates signup form
 * I: signUp function to change state of logged in or not
 * { username, password, firstName, lastName, email }
 */
const SignUpForm = ({ signUp }) => {
  const [signUpErrors, setSignUpErrors] = useState([]);
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(1)
      .max(25, 'Username cannot exceed 25 characters')
      .required('Required'),
    firstName: Yup.string()
      .min(1)
      .max(255, 'Max first name length is 255 characters')
      .required('Required'),
    lastName: Yup.string()
      .min(1)
      .max(255, 'Max last name length is 255 characters')
      .required('Required'),
    email: Yup.string()
      .email('Must be a valid email')
      .min(1)
      .max(255, 'Max email length is 255 characters')
      .required('Email is required'),
    password: Yup.string()
      .min(5)
      .max(255, 'Max password length is 255 characters')
      .required('Required'),
    confirmPassword: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both passwords need to match'
      ),
    }),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.debug('In SignUpForm.js, onSubmit');
    console.log('Form Data: ', values); //comment out later so password not revealed

    //a copy of values object is made so this component does not become uncontrolled
    const valuesCopy = { ...values };
    delete valuesCopy.confirmPassword;

    const res = await signUp(valuesCopy);

    if (res.success) {
      //maybe make success banner if true in html
      navigate('/user/profile');

      //see bug in todos
    } else {
      setSignUpErrors(res.errors); //trouble shoot later how to actuallyy display these properly
      resetForm({});
    }
    //if login fail show error message and navigate back2Login

    // https://github.com/jaredpalmer/formik/issues/446
  };

  return (
    <>
      <div className='SignUpForm'>
        {signUpErrors && signUpErrors.length
          ? signUpErrors.map((error) => {
              return (
                <div className='SignUpForm-failed' key={uuidv4()}>
                  {error}
                </div>
              );
            })
          : ``}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <>
            {/* Formik component can only have one child. */}
            <p>SIGN UP!</p>
            <Form className='SignUpForm-form'>
              <div className='SignUpForm-username field'>
                <label htmlFor='username'>Username</label>
                <Field type='text' id='username' name='username' />
                <p className='form-warning'><ErrorMessage name='username' /></p>
              </div>
              <div className={`SignUpForm-firstName field`}>
                <label htmlFor='firstName'>First Name</label>
                <Field type='text' id='firstName' name='firstName' />
                <p className='form-warning'><ErrorMessage name='firstName'/></p>
              </div>
              <div className={`SignUpForm-lastName field`}>
                <label htmlFor='lastName'>Last Name</label>
                <Field type='text' id='lastName' name='lastName' />
                <p className='form-warning'><ErrorMessage name='lastName' /></p>
              </div>
              <div className={`SignUpForm-email field`}>
                <label htmlFor='email'>Email</label>
                <Field type='text' id='email' name='email' />
                <p className='form-warning'><ErrorMessage name='email' /></p>
              </div>
              <div className={`SignUpForm-password field`}>
                <label htmlFor='password'>Password</label>
                <Field type='password' id='password' name='password' />
                <p className='form-warning'><ErrorMessage name='password' autoComplete='off' /></p>
              </div>
              <div className={`SignUpForm-confirmPassword field`}>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <Field
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                />
                <p className='form-warning'><ErrorMessage name='confirmPassword' autoComplete='off' /></p>
              </div>
              <button type='submit' id='submit'>
                Submit
              </button>
            </Form>
          </>
        </Formik>
      </div>
    </>
  );
};

export default SignUpForm;
