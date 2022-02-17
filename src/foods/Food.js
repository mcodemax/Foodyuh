import React, { useState, useContext, useEffect } from 'react';
import FoodyuhApi from '../foodyuhApi';
import FoodSearch from './FoodSearch';
import { v4 as uuidv4 } from 'uuid';


function Food({food, plateId}) {
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
  const addFoodtoPlate = async (fdcId, plateId) => {
    try {
      const res = FoodyuhApi.addFood(fdcId.toString(), plateId);
    } catch (error) {
      console.log(error)
    }
  }

  const nutrientDisplay = (foodNutrients) => {
    // list nutrientName, : value, unitName  
    return (
      <>
      {foodNutrients.map(nutrient => {
      return (
          <div className='Food-nutrient'>
             <span>{nutrient.nutrientName}: {nutrient.value}{nutrient.unitName}</span>
            
           </div>
         )
       }) 
       }
      </>
    )
  }

  return (
    <div className='Food' >
      {console.log(food)
      //add data type for html, fdcId
      }
      <span>Food Name: {`${food.description}`} </span>
      <span>Description: {`${food.lowercaseDescription}`} </span>
      <span>Brand: {`${food.brandName}`} </span>
      <span>Ingredients: {`${food.ingredients}`} </span>

      <div>
        Nutrient Profile: {nutrientDisplay(food.foodNutrients)}
      </div>
      <span></span>
      <span></span>

      <button onClick={() => addFoodtoPlate(food.fdcId, plateId)}>Btn to add food to plate</button> 
      {/* https://upmostly.com/tutorials/react-onclick-event-handling-with-examples */}
    </div>
  )
}

export default Food;
