import React, { useState, useContext, useEffect } from 'react';
import FoodyuhApi from '../foodyuhApi';
import { v4 as uuidv4 } from 'uuid';

function FoodForPlate({ food, plateId, setTotalNutrition }) {
  // const getFood = async () => {
  //   try {
  //     const res = await FoodyuhApi.getFoodbyFdcId(plateId);
  //     setPlate(res);
  //   } catch (error) {
  //     console.error('App plateInfo: problem loading', error);
  //     setChangeInfoErrors(error); //trouble shoot later how to actuallyy display these properly
  //   }
  //   setPlateInfoLoaded(true);
  // };
  const removeFood = async (fdcId, plateId) => {
    try {
      const res = FoodyuhApi.deleteFood(fdcId, plateId);
    } catch (error) {
      console.log(error);
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
      <img src={food.image} alt='Food pic not avail'></img>
      <div>Food Name: {`${food.description.toLowerCase()}`} </div>
      <div>Brand: {`${food.brandOwner}`} </div>
      <div>Nutrient Profile: {nutrientDisplay(food.foodNutrients)}</div>
      <span></span>
      <span></span>

      <button onClick={() => removeFood(food.fdcId, plateId)}>
        Remove Food
      </button>
    </div>
  );
}

export default FoodForPlate;
