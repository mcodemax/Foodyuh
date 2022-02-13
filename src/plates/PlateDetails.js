import React, { useState, useContext, useEffect } from 'react';
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
  const [plateInfoLoaded, setPlateInfoLoaded] = useState(false);
  const [plate, setPlate] = useState();
  const navigate = useNavigate();

  //show all plates with foods in them in mini panels
  //clicking on an indiv plate goes to PlateDetails

  const initialValues = {
    name: '',
    description: '',
  };

  useEffect(async () => {
    console.debug('PlateDetails useEffect loadPlateInfo', 'plate=', 'idk');

    let foodDetailsPromises = [];
    let foodsPexelImagesPromises = [];
    setPlateInfoLoaded(false);

    try {
      const res = await FoodyuhApi.getPlate(plateId);
      //loop thru and for each food do like food.nurtitionInfo = nutritioninforeturns
      // and food.picture = whatever returns from pexels api call[0]
      res.foods.forEach((food) => {
        foodDetailsPromises.push(FoodyuhApi.getFoodbyFdcId(food.fdcId));
      });

      const resNutritionDetails = await Promise.all(foodDetailsPromises);
      res.foods.forEach((food, idx) => {
        food.details = resNutritionDetails[idx];
      });

      res.foods.forEach((food) => {
        foodsPexelImagesPromises.push(FoodyuhApi.getImages(food.details.description));
        console.log(food.details.description);
      });

      const resFoodsPexelImages = await Promise.all(foodsPexelImagesPromises);
      console.log(resFoodsPexelImages)
      res.foods.forEach((food, idx) => {
        food.details.image = resFoodsPexelImages[idx][0].src.small;
        console.log(resFoodsPexelImages[idx])
      });

      console.log('res asfter dets', res);

      setPlate(res);

      //loop through plate.foods
      //in promise.all make api call with FoodyuhApi.getFoodbyFdcId(food.fdcId)
      //      and FoodyuhApi.getImages(search) [but using the first image in response]
      //          append the above with like food.image = res[1]......
    } catch (error) {
      console.error('App plateInfo: problem loading', error);
      setChangeInfoErrors(error); //trouble shoot later how to actuallyy display these properly
    }
  }, [currentUser]); //maybe make dependent on some vars that updates after adding an fdcid food
  //currentUser or something that gets modified once adding a food,
  //maybe add a isModified variable

  useEffect(() => {
    if (plate) {
      setPlateInfoLoaded(true);
    }
  }, [plate]);

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

  //add a food search component

  const onSubmit = async (values, { resetForm }) => {};

  return (
    <div className='PlateDetails'>
      <div className='PlateDetails-PlatesList'>
        {plate ? (
          <>
            <p>{plate.name}</p>
            <p>{plate.description}</p>
          </>
        ) : null}
        <p>Foods</p>
        {plate
          ? plate.foods.map((food) => {
              return (
                <div
                  className='PlateDetails-Food'
                  key={`food-${food.fdcId}-${uuidv4()}`}
                >
                  <p>{console.log(food)}</p>
                  {/* awwait the stuff in here , call FoodyuhApi.getFoodbyFdcId(food.fdcId) */}
                </div>
                // add a hyperlink tag to navigate to indiv plate details
              );
            })
          : null}
      </div>

      <div className='PlateDetails-form'>
        {/* {changeInfoErrors.length
          ? changeInfoErrors.map((error) => {
              return (
                <div className='Login-failed' key={uuidv4()}>
                  {error}
                </div>
              );
            })
          : ``} */}
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
