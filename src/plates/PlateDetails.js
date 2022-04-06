import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../auth/UserContext';
import './PlateDetails.scss';
import FoodyuhApi from '../foodyuhApi';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import FoodSearch from '../foods/FoodSearch';
import FoodForPlate from '../foods/FoodForPlate';
import { foodTotals } from './foodNutrients';
import nutrientKeys from '../nutrientKeys';
import LoadingSpinner from '../LoadingSpinner';

/** Shows all existing plates & has a form to add plates */
function PlateDetails() {
  const { plateId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [plateInfoLoaded, setPlateInfoLoaded] = useState(false);
  const [plate, setPlate] = useState();
  const [totalNutrition, settotalNutrition] = useState(foodTotals);

  useEffect(() => {
    const attachImgs = async () => {
      setPlateInfoLoaded(false);

      try {
        const res = await FoodyuhApi.getPlate(plateId);

        await Promise.all(
          res.foods.map(async (food) => {
            const foodDetails = await FoodyuhApi.getFoodbyFdcId(food.fdcId);
            food.details = foodDetails;

            const foodsPexelImages = await FoodyuhApi.getImages(
              food.details.description
            );
            food.details.image = foodsPexelImages[0].src.small;
          })
        );

        setPlate(res);
      } catch (error) {
        setErrors(error);
      }
    };

    attachImgs();
  }, [currentUser, plateId]);

  useEffect(() => {
    if (plate) {
      //because plate's initial state is null
      setPlateInfoLoaded(true);
      const accumFoodTotals = JSON.parse(JSON.stringify(foodTotals));

      plate.foods.forEach((food) => {
        food.details.foodNutrients.forEach((nutrient) => {
          accumFoodTotals[nutrient.number].value += nutrient.amount;
        });
      });

      settotalNutrition(accumFoodTotals);
    }
  }, [plate]);

  return (
    <div className='PlateDetails'>
      <div className='PlateDetails-PlatesList'>
        {plate ? (
          <>
            <p className='name'>{plate.name}</p>
            <p className='description'>{plate.description}</p>
          </>
        ) : null}
        <p>Foods:</p>
        <div className='food-list'>
          {plate ? (
            plate.foods.map((food) => {
              return (
                <FoodForPlate
                  food={food.details}
                  plateId={plateId}
                  setTotalNutrition={settotalNutrition}
                  key={uuidv4()}
                />
              );
            })
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {plateInfoLoaded ? (
          <div className='totalnutrition'>
            <p>Total Plate Nutrition:</p>
            <p>
              {+totalNutrition[nutrientKeys.kcals].value.toFixed(2)}{' '}
              {totalNutrition[nutrientKeys.kcals].unitName}
            </p>
            <p>
              {+totalNutrition[nutrientKeys.protein].value.toFixed(2)}{' '}
              {totalNutrition[nutrientKeys.protein].unitName}{' '}
              {totalNutrition[nutrientKeys.protein].nutrientName}
            </p>
            <p>
              {+totalNutrition[nutrientKeys.carbs].value.toFixed(2)}{' '}
              {totalNutrition[nutrientKeys.carbs].unitName}{' '}
              {totalNutrition[nutrientKeys.carbs].nutrientName}
            </p>
            <p>
              {+totalNutrition[nutrientKeys.fats].value.toFixed(2)}{' '}
              {totalNutrition[nutrientKeys.fats].unitName}{' '}
              {totalNutrition[nutrientKeys.fats].nutrientName}
            </p>
            <p>
              {+totalNutrition[nutrientKeys.fiber].value.toFixed(2)}{' '}
              {totalNutrition[nutrientKeys.fiber].unitName}{' '}
              {totalNutrition[nutrientKeys.fiber].nutrientName}
            </p>
            <p>
              {+totalNutrition[nutrientKeys.vitC].value.toFixed(2)}{' '}
              {totalNutrition[nutrientKeys.vitC].unitName}{' '}
              {totalNutrition[nutrientKeys.vitC].nutrientName}
            </p>
            <p>
              {+totalNutrition[nutrientKeys.calcium].value.toFixed(2)}{' '}
              {totalNutrition[nutrientKeys.calcium].unitName}{' '}
              {totalNutrition[nutrientKeys.calcium].nutrientName}
            </p>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className='PlateDetails-form'>
        {errors.length
          ? errors.map((error) => {
              return (
                <div className='PlateDetails-failed' key={uuidv4()}>
                  {error}
                </div>
              );
            })
          : ``}
        <>
          <FoodSearch plateId={plateId} />
        </>
      </div>
    </div>
  );
}

export default PlateDetails;
