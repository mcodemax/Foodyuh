import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from '../auth/UserContext';
import './AllPlatesAdd.scss';
import { useNavigate } from 'react-router-dom';
import FoodyuhApi from '../foodyuhApi';
import { v4 as uuidv4 } from 'uuid';

/** Shows all existing plates & has a form to add plates */
function AllPlatesAdd() {
  const { currentUser, setUserInfoUpdated, userInfoUpdated } = useContext(UserContext);
  const [changeInfoErrors, setChangeInfoErrors] = useState([]);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    description: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(1)
      .max(255, 'Max plate name length is 255 characters')
      .required('Required'),
    description: Yup.string()
      .min(1)
      .max(255, 'Max plate description length is 255 characters')
      .required('Required'),
  });

  useEffect(() => {
    if (userInfoUpdated) {
      setUserInfoUpdated(false);
    }
  }, [userInfoUpdated]);

  const onSubmit = async (values, { resetForm }) => {
    try {
        const res = await FoodyuhApi.addPlate(values.name, values.description);
        setUserInfoUpdated(true);
        navigate(`/plates/${res.id}`, { replace: true });
    } catch (error) {
        setChangeInfoErrors(error); 
        resetForm({});
    }
  };

  const deletePlate = async (plateId) => {
    try {
      const res = await FoodyuhApi.deletePlate(plateId);
      setUserInfoUpdated(true);
      setUserInfoUpdated(null);
      navigate(`/plates`, { replace: true });
    } catch (error) {
      setChangeInfoErrors(error);
    }
  };

  return (
    <div className='AllPlatesAdd'>
      <p>Plates</p>
      <div className='AllPlatesAdd-PlatesList'>
        
        {currentUser.plates
          ? currentUser.plates.map((plate) => {
              return (
                <div className='plate' key={`plate-${plate.id}`}>
                  <a href={`/plates/${plate.id}`}>{plate.name}</a>
                  <p>{plate.description}</p>
                  <button onClick={() => deletePlate(plate.id)}>Remove Plate</button>
                </div>
              );
            })
          : null}
      </div>

      <div className='AllPlatesAdd-form'>
        {changeInfoErrors.length
          ? changeInfoErrors.map((error) => {
              return (
                <div className='error' key={uuidv4()}>
                  <p>{error}</p>
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
            <p>Add a Plate!</p>
            <Form className={'AllPlatesAdd-form'}>
              <div className={'AllPlatesAdd-form-name field'}>
                <label htmlFor='name'>Plate Name</label>
                <Field type='text' id='name' name='name' />
                <ErrorMessage name='name' />
              </div>
              <div className={'AllPlatesAdd-form-description field'}>
                <label htmlFor='description'>Plate Description</label>
                <Field type='text' id='description' name='description' />
                <ErrorMessage name='description' />
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

export default AllPlatesAdd;
