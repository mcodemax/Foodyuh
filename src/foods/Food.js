import React, { useState, useContext, useEffect } from 'react';
import FoodyuhApi from '../foodyuhApi';

function Food(fdcId) {
  const getFood = async () => {
    try {
      const res = await FoodyuhApi.getFoodbyFdcId(plateId);
      setPlate(res);
    } catch (error) {
      console.error('App plateInfo: problem loading', error);
      setChangeInfoErrors(error); //trouble shoot later how to actuallyy display these properly
    }
    setPlateInfoLoaded(true);
  };

  return <div className='Food'></div>;
}

export default Food;
