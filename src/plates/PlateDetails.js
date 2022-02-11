import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from '../auth/UserContext';
// import './PlateDetails.scss';
import { useNavigate } from 'react-router-dom';
import FoodyuhApi from '../foodyuhApi';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

//when user adds a plate foodyuhapi.addPlate(name, description) is called, plate is returned
//they get redirected to the returned plate specific page where they can add foods

/** Shows all existing plates & has a form to add plates */
function PlateDetails() {
  const { plateId } = useParams(); //https://ui.dev/react-router-url-parameters
  const { currentUser } = useContext(UserContext);
  const [changeInfoErrors, setChangeInfoErrors] = useState([]); //implement later
  const navigate = useNavigate();

  //show all plates with foods in them in mini panels
  //clicking on an indiv plate goes to PlateDetails

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

  const onSubmit = async (values, { resetForm }) => {

  };

  return (
    <div className='PlateDetails'>
      <div className='PlateDetails-PlatesList'>
        <p>Foods {console.log(currentUser)}</p>
        {currentUser.plates
          ? currentUser.plates.map((plate) => {
              return (
                <div className='PlateDetails-Plate' key={`plate-${plate.id}`}>
                  <p>{plate.name}</p>
                  <p>{plate.description}</p>
                </div>
                // add a hyperlink tag to navigate to indiv plate details
              );
            })
          : null}
      </div>

      <div className='PlateDetails-form'>
        {changeInfoErrors.length
          ? changeInfoErrors.map((error) => {
              return (
                <div className='Login-failed' key={uuidv4()}>
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
            <p>Add a Food</p>
            <Form className={`PlateDetails-form`}>
              <div className={`PlateDetails-form-name`}>
                <label htmlFor='name'>Plate Name</label>
                <Field type='text' id='name' name='name' />
                <ErrorMessage name='name' />
              </div>
              <div className={`PlateDetails-form-description`}>
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

export default PlateDetails;
