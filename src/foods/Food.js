import React, { useState, useContext, useEffect } from 'react';
import './Food.scss';
import FoodyuhApi from '../foodyuhApi';
import UserContext from '../auth/UserContext';
import { v4 as uuidv4 } from 'uuid';

function Food({ food, plateId }) {
  const [foodPlateErrors, setFoodPlateErrors] = useState([]);
  const { setUserInfoUpdated, userInfoUpdated } = useContext(UserContext);

  const addFoodtoPlate = async (fdcId, plateId) => {
    try {
      await FoodyuhApi.addFood(fdcId.toString(), plateId);
      setUserInfoUpdated(true);
    } catch (error) {
      setFoodPlateErrors(error);
    }
  };

  useEffect(() => {
    if (userInfoUpdated) {
      setUserInfoUpdated(false);
    }
  }, [userInfoUpdated, setUserInfoUpdated]);

  const nutrientDisplay = (foodNutrients) => {
    return (
      <>
        {foodNutrients.map((nutrient) => {
          return (
            <div className='Food-nutrient' key={uuidv4()}>
              <span>
                {nutrient.nutrientName}: {nutrient.value}
                {nutrient.unitName}
              </span>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className='Food'>
      {foodPlateErrors.length
        ? foodPlateErrors.map((error) => {
            return (
              <div className='error' key={uuidv4()}>
                <p>{error}</p>
              </div>
            );
          })
        : ``}
      <img src={food.image} alt='Food pic not avail'></img>
      <p>Food Name: {`${food.description}`} </p>
      <p>Brand: {`${food.brandName}`} </p>
      <div>
        <b>Nutrient Profile:</b>
        {nutrientDisplay(food.foodNutrients)}
      </div>
      <button onClick={() => addFoodtoPlate(food.fdcId, plateId)}>
        Add food to my plate!
      </button>
    </div>
  );
}

export default Food;
