import React, { useState, useContext, useEffect } from 'react';
import FoodyuhApi from '../foodyuhApi';
import './FoodSearch.scss';
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
      const pics = await FoodyuhApi.getImages(values.search);

      if(typeof res === 'string') throw ['No Foods Found'];

      res.forEach((food, idx) => {
        if(pics){
          food.image = pics[idx]['src']['small'];
        }else{
          food.image = '';
        }
        console.log(pics[idx]['src']['small'])
      });

      setErrors([]);
      setFoods(res);
    } catch (error) {
        setErrors(error);//shove array of errors in here, need to reset errors if resubmission successful
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
              <p>Search and add a Food!</p>
              <Form className={`FoodSearch-form`}>
                <div className={`FoodSearch-form-search`}>
                  <label htmlFor='search'>Search</label>
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
      {errors.length
          ? errors.map((error) => {
              return (
                <div className='FoodSearch-errors' key={uuidv4()}>
                  {error}
                </div>
              );
            })
          : null}
      <div className='FoodSearch-foodslist'>
        {foods ? foods.map( food => {
              return (
                <>
                  <Food food={food} plateId={plateId} key={uuidv4()}/>
                  {/*
                      let's keep secret html value:
                      fdcId
                      maybe not?^
                  */}
                </>
              );
            }) : null}
      </div>

    </div>
  )
}

export default FoodSearch;


