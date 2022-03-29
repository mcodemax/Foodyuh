import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from '../auth/UserContext';
import './ProfilePage.scss';
import FoodyuhApi from '../foodyuhApi';
import { v4 as uuidv4 } from 'uuid';

function ProfilePage() {
  const { currentUser, setUserInfoUpdated, setShowMessage, showMessage } =
    useContext(UserContext);
  const [changeInfoErrors, setChangeInfoErrors] = useState([]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(1)
      .max(255, 'Max first name length is 255 characters')
      .notRequired()
      .default(undefined),
    lastName: Yup.string()
      .min(1)
      .max(255, 'Max last name length is 255 characters')
      .notRequired()
      .default(undefined),
    email: Yup.string()
      .email('Must be a valid email')
      .min(1)
      .max(255, 'Max email length is 255 characters')
      .notRequired()
      .default(undefined),
    newPassword: Yup.string()
      .min(5)
      .max(255, 'Max password length is 255 characters')
      .notRequired()
      .default(undefined),
    newPasswordConfirm: Yup.string().when('newPassword', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Both passwords need to match'
      ),
    }),
  });

  const onSubmit = async (values, { resetForm }) => {
    //a copy of values object is made so this component does not become uncontrolled
    const valuesCopy = { ...values };
    setShowMessage('');

    //workaround for yup validation not accepting circular refs;
    //if newPassword exists make sure newPasswordConfirm exists as well
    if (valuesCopy.newPassword && !valuesCopy.newPasswordConfirm) {
      setChangeInfoErrors(['Please confirm new password to change it']); //trouble shoot later how to actuallyy display these properly
      return;
    }

    //alters info change data to fit FoodyuhApi.editUserInfo allowed input
    if (valuesCopy.newPassword) {
      valuesCopy.password = valuesCopy.newPassword;
      delete valuesCopy.newPassword;
      delete valuesCopy.newPasswordConfirm;
    }

    for (let value in valuesCopy) {
      if (!valuesCopy[value]) delete valuesCopy[value];
    }

    try {
      await FoodyuhApi.editUserInfo(
        currentUser.username,
        valuesCopy
      );

      resetForm({});

      setUserInfoUpdated(true);
      setUserInfoUpdated(false);

      setShowMessage('Info Change Successful!');
    } catch (error) {
      setShowMessage('Info Change DENIED!');
      setChangeInfoErrors(error);
      resetForm({});
    }
    
  };

  return (
    <div className='ProfilePage'>
      {showMessage ? (
        <div className='ProfilePage-Message'>{showMessage}</div>
      ) : null}
      <div className='ProfilePage-user'>
        <p>User Name: {currentUser.username}</p>
        <p>First Name: {currentUser.firstName}</p>
        <p>Last Name: {currentUser.lastName}</p>
        <p>Email: {currentUser.email}</p>
        <p>Admin Status: {currentUser.isAdmin ? `Yes` : `No`}</p>
      </div>

      <div className='ProfilePage-form'>
        {changeInfoErrors.length
          ? changeInfoErrors.map((error) => {
              return (
                <div className='ProfilePage-changeInfo-failed' key={uuidv4()}>
                  {error}
                </div>
              );
            })
          : null}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <>
            <p>Edit Your Info:</p>
            <Form className={'ProfilePage-form'}>
              <div className={'SignUpForm-firstName field'}>
                <label htmlFor='firstName'>First Name</label>
                <Field type='text' id='firstName' name='firstName' />
                <p className='form-warning'><ErrorMessage name='firstName' /></p>
              </div>
              <div className={'ProfilePage-form-lastName field'}>
                <label htmlFor='lastName'>Last Name</label>
                <Field type='text' id='lastName' name='lastName' />
                <p className='form-warning'><ErrorMessage name='lastName' /></p>
              </div>
              <div className={'ProfilePage-form-email field'}>
                <label htmlFor='email'>Email</label>
                <Field type='text' id='email' name='email' />
                <p className='form-warning'><ErrorMessage name='email' /></p>
              </div>
              <div className={'ProfilePage-form-new-password field'}>
                <label htmlFor='newPassword'>New Password (optional)</label>
                <Field
                  type='password'
                  id='newPassword'
                  name='newPassword'
                  autoComplete='off'
                />
                <p className='form-warning'><ErrorMessage name='newPassword' /></p>
              </div>
              <div className={`ProfilePage-form-new-password-confirm field`}>
                <label htmlFor='newPasswordConfirm'>Confirm New Password</label>
                <Field
                  type='password'
                  id='newPasswordConfirm'
                  name='newPasswordConfirm'
                  autoComplete='off'
                />
                <p className='form-warning'><ErrorMessage name='newPasswordConfirm' /></p>
              </div>
              <button type='submit' id='submit'>
                Submit
              </button>
            </Form>
          </>
        </Formik>
      </div>
    </div>
  );
}

export default ProfilePage;
