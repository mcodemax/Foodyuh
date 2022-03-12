import React, { useState, useContext, useEffect } from 'react';
import './Food.scss';
import FoodyuhApi from '../foodyuhApi';
import UserContext from '../auth/UserContext';
import { v4 as uuidv4 } from 'uuid';

function Food({food, plateId}) {
  const [foodPlateErrors, setFoodPlateErrors] = useState([]);
  const { setUserInfoUpdated } = useContext(UserContext);

  const addFoodtoPlate = async (fdcId, plateId) => {
    try {
      const res = await FoodyuhApi.addFood(fdcId.toString(), plateId);
      setUserInfoUpdated(true);
      setUserInfoUpdated(null);
    } catch (error) {
      setFoodPlateErrors(error);
    }
  }

  const nutrientDisplay = (foodNutrients) => {
    return (
      <>
      {foodNutrients.map(nutrient => {
      return (
          <div className='Food-nutrient' key={uuidv4()}>
             <span>{nutrient.nutrientName}: {nutrient.value}{nutrient.unitName}</span>
           </div>
         )
       }) 
       }
      </>
    )
  }


  //for styling we want to make this into a card and center it.
  return (
    <div className='Food' >
      {foodPlateErrors.length
          ? foodPlateErrors.map((error) => {
              return (
                <div className='error' key={uuidv4()}>
                  <p>{error}</p>
                </div>
              );
            })
          : ``}
      <img src={food.image} alt="Food pic not avail"></img>
      <p>Food Name: {`${food.description}`} </p>
      <p>Brand: {`${food.brandName}`} </p>

      <div>
        <b>Nutrient Profile:</b>
        {nutrientDisplay(food.foodNutrients)}
      </div>
      <span></span>
      <span></span>

      <button onClick={() => addFoodtoPlate(food.fdcId, plateId)}>Add food to my plate!</button> 
      {/* https://upmostly.com/tutorials/react-onclick-event-handling-with-examples */}
    </div>
  )
}

export default Food;
