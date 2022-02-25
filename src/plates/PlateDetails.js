import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserContext from '../auth/UserContext';
// import './PlateDetails.scss';
import { useNavigate } from 'react-router-dom';
import FoodyuhApi from '../foodyuhApi';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import FoodSearch from '../foods/FoodSearch';
import FoodForPlate from '../foods/FoodForPlate';
import { foodTotals } from './foodNutrients';


//when user adds a plate foodyuhapi.addPlate(name, description) is called, plate is returned
//they get redirected to the returned plate specific page where they can add foods

/** Shows all existing plates & has a form to add plates */
function PlateDetails() {
  const { plateId } = useParams(); //https://ui.dev/react-router-url-parameters
  const { currentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]); //implement later
  const [plateInfoLoaded, setPlateInfoLoaded] = useState(false);
  const [plate, setPlate] = useState();
  const [totalNutrition, settotalNutrition] = useState(foodTotals);
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
      setErrors(error); //trouble shoot later how to actuallyy display these properly
    }
  }, [currentUser]); //maybe make dependent on some vars that updates after adding an fdcid food
  //currentUser or something that gets modified once adding a food,
  //maybe add a isModified variable

  useEffect(() => {
    if (plate) { //because plate's initial state is null
      setPlateInfoLoaded(true);
      const accumFoodTotals = JSON.parse(JSON.stringify(foodTotals));

      plate.foods.forEach( food => {
        food.details.foodNutrients.forEach( nutrient => {
          const nutrientNumber = nutrient.number;
          // console.log(nutrient.number, nutrient.amount, accumFoodTotals[nutrientNumber])
          accumFoodTotals[nutrient.number].value+=nutrient.amount;
          //alter the above so we have nothing weird happen.
        });
      });

      settotalNutrition(accumFoodTotals);
      console.log(accumFoodTotals)
      // food.details.foodNutrients.map( nutrient => {

      // });
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
        <p>Foods:</p>
        {plate
          ? plate.foods.map((food) => {
              return (
                <div
                  className='PlateDetails-Food'
                  key={`food-${food.fdcId}-${uuidv4()}`}
                >
                  <FoodForPlate food={food.details} plateId={plateId} setTotalNutrition={settotalNutrition} key={uuidv4()}/>
                </div>
              );
            })
          : null}
          <div className='PlateDetails-totalnutrition'>
            <p>Total Plate Nutrition:</p>
            <p>{totalNutrition[208].value} {totalNutrition[208].unitName}</p>
            <p>{totalNutrition[203].value} {totalNutrition[203].unitName} {totalNutrition[203].nutrientName}</p>
            <p>{totalNutrition[205].value} {totalNutrition[205].unitName} {totalNutrition[205].nutrientName}</p>
            <p>{totalNutrition[204].value} {totalNutrition[204].unitName} {totalNutrition[204].nutrientName}</p>
            <p>{totalNutrition[291].value} {totalNutrition[291].unitName} {totalNutrition[291].nutrientName}</p>
            <p>{totalNutrition[401].value} {totalNutrition[401].unitName} {totalNutrition[401].nutrientName}</p>
            <p>{totalNutrition[301].value} {totalNutrition[301].unitName} {totalNutrition[301].nutrientName}</p>
          </div>
      </div>

      <div className='PlateDetails-form'>
        {/* {changeInfoErrors.length
          ? changeInfoErrors.map((error) => {
              return (
                <div className='PlateDetails-failed' key={uuidv4()}>
                  {error}
                </div>
              );
            })
          : ``} */}
          <>
            <FoodSearch plateId={plateId} />
          </>
      </div>
    </div>
  );
}

export default PlateDetails;
