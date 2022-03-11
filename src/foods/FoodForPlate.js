import React, { useState, useContext, useEffect } from 'react';
import FoodyuhApi from '../foodyuhApi';
import { v4 as uuidv4 } from 'uuid';
import './FoodForPlate.scss';

function FoodForPlate({ food, plateId, setTotalNutrition }) {
  const [foodPlateErrors, setFoodPlateErrors] = useState([]);

  const removeFood = async (fdcId, plateId) => {
    try {
      const res = await FoodyuhApi.deleteFood(fdcId, plateId);
      console.log(res);
    } catch (error) {
      setFoodPlateErrors(error);
    }
  };

  const nutrientDisplay = (foodNutrients) => {
    return (
      <>
        {foodNutrients.map( nutrient => {
          return (
            <div className='FoodForPlate-nutrient' key={uuidv4()}>
              {nutrient.name}: {nutrient.amount}{nutrient.unitName}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className='FoodForPlate'>
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
      <div>Food Name: {`${food.description.toLowerCase()}`} </div>
      <div>Brand: {`${food.brandOwner}`} </div>
      <div><b>Nutrient Profile:</b> {nutrientDisplay(food.foodNutrients)}</div>

      <button onClick={() => removeFood(food.fdcId, plateId)}>
        Remove Food
      </button>
    </div>
  );
}

export default FoodForPlate;
