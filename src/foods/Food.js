import React, { useState, useContext, useEffect } from 'react';
import './Food.scss';
import FoodyuhApi from '../foodyuhApi';
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
      {console.log(food)
      //add data type for html, fdcId
      }
      <img src={food.image} alt="Food pic not avail"></img>
      <p>Food Name: {`${food.description}`} </p>
      {/* <span>Description: {`${food.lowercaseDescription}`} </span> */}
      <p>Brand: {`${food.brandName}`} </p>
      {/* <span>Ingredients: {`${food.ingredients}`} </span> */}
      {/* desc and ingredients ommitted b/c fdcapi search vs getting indiv food details returs 
      differing data */}
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
