import React, { useState, useContext, useEffect } from 'react';
import FoodyuhApi from '../foodyuhApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from '../auth/UserContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import Food from './Food';

//may need to pass a f(0 in from parent level PlateDetails compoenent to add fdcid)
function FoodSearch({plateId}) {
  const [foods, setFoods] = useState();
  const [errors, setErrors] = useState([]);

  const initialValues = {
    search: '',
  };

  const onSubmit = async (values, { resetForm }) => {

    try {
      const res = await FoodyuhApi.searchForFoods(values.search);
      setFoods(res);
      console.log(res)
    } catch (error) {
      //implment error handling later
        resetForm({});
    }
    // https://github.com/jaredpalmer/formik/issues/446
  };

  const validationSchema = Yup.object({
    search: Yup.string()
      .min(1)
      .max(255, 'Max search query is 255 characters')
      .required('Required'),
  });

  return (
    <div className='FoodSearch'>
      <div className='FoodSearch-formik'>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <>
              <p>Search for a Food!</p>
              <Form className={`FoodSearch-form`}>
                <div className={`FoodSearch-form-search`}>
                  <label htmlFor='search' >Search</label>
                  <Field type='text' id='search' name='search' placeholder='Find a food'/>
                  <ErrorMessage name='search' />
                </div>
                <button type='submit' id='submit'>
                  Submit
                </button>
              </Form>
            </>
        </Formik>
      </div>
      <div className='FoodSearch-foodslist'>
        {foods ? foods.map( food => {
              return (
                <>
                  <Food food={food} plateId={plateId} key={uuidv4()}/>
                  {/* pass in f() to food component to add call f() to add food to the plate */}
                  {console.log(food)}
                  {/*
                    let's pass in params to a food card 
                    lets display:
                      brandOwner
                      let's keep secret html value:
                      fdcId
                  */}
                </>
                // add a hyperlink tag to navigate to indiv plate details
              );
            }) : null}
      </div>

    </div>
  )
}

export default FoodSearch;
