import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { act, render } from "@testing-library/react";
import Food from './Food'
import UserContext from '../auth/UserContext';

const food = {
    "fdcId": 2142314,
    "description": "MICKEY MOUSE WAFFLES",
    "lowercaseDescription": "mickey mouse waffles",
    "dataType": "Branded",
    "publishedDate": "2021-10-28",
    "brandOwner": "The Kellogg Company ",
    "brandName": "EGGO",
    "ingredients": "ENRICHED FLOUR (WHEAT FLOUR, NIACIN, REDUCED IRON, VITAMIN B1 [THIAMIN MONONITRATE], VITAMIN B2 [RIBOFLAVIN], FOLIC ACID), WATER, VEGETABLE OIL (SOYBEAN, PALM, AND/OR CANOLA), EGGS, LEAVENING (BAKING SODA, SODIUM ALUMINUM PHOSPHATE, MONOCALCIUM PHOSPHATE), CONTAINS 2% OR LESS OF SUGAR, SALT, WHEY, SOY LECITHIN, BETA-CAROTENE FOR COLOR. VITAMINS AND MINERALS: CALCIUM CARBONATE, REDUCED IRON, VITAMIN A PALMITATE, VITAMIN B6 (PYRIDOXINE HYDROCHLORIDE), VITAMIN B12.",
    "marketCountry": "United States",
    "foodCategory": "Frozen Pancakes, Waffles, French Toast & Crepes",
    "modifiedDate": "2020-12-01",
    "dataSource": "LI",
    "packageWeight": "2.1 kg",
    "servingSizeUnit": "g",
    "servingSize": 70,
    "score": 71.905846,
    "foodNutrients": [
        {
            "nutrientId": 1003,
            "nutrientName": "Protein",
            "nutrientNumber": "203",
            "unitName": "G",
            "derivationCode": "LCCS",
            "derivationDescription": "Calculated from value per serving size measure",
            "derivationId": 70,
            "value": 5.71,
            "foodNutrientSourceId": 9,
            "foodNutrientSourceCode": "12",
            "foodNutrientSourceDescription": "Manufacturer's analytical; partial documentation",
            "rank": 600,
            "indentLevel": 1,
            "foodNutrientId": 25097021
        },
        {
            "nutrientId": 1004,
            "nutrientName": "Total lipid (fat)",
            "nutrientNumber": "204",
            "unitName": "G",
            "derivationCode": "LCCS",
            "derivationDescription": "Calculated from value per serving size measure",
            "derivationId": 70,
            "value": 8.57,
            "foodNutrientSourceId": 9,
            "foodNutrientSourceCode": "12",
            "foodNutrientSourceDescription": "Manufacturer's analytical; partial documentation",
            "rank": 800,
            "indentLevel": 1,
            "foodNutrientId": 25097022,
            "percentDailyValue": 8
        },
        {
            "nutrientId": 1005,
            "nutrientName": "Carbohydrate, by difference",
            "nutrientNumber": "205",
            "unitName": "G",
            "derivationCode": "LCCS",
            "derivationDescription": "Calculated from value per serving size measure",
            "derivationId": 70,
            "value": 38.6,
            "foodNutrientSourceId": 9,
            "foodNutrientSourceCode": "12",
            "foodNutrientSourceDescription": "Manufacturer's analytical; partial documentation",
            "rank": 1110,
            "indentLevel": 2,
            "foodNutrientId": 25097023,
            "percentDailyValue": 10
        },
        {
            "nutrientId": 1008,
            "nutrientName": "Energy",
            "nutrientNumber": "208",
            "unitName": "KCAL",
            "derivationCode": "LCCS",
            "derivationDescription": "Calculated from value per serving size measure",
            "derivationId": 70,
            "value": 257,
            "foodNutrientSourceId": 9,
            "foodNutrientSourceCode": "12",
            "foodNutrientSourceDescription": "Manufacturer's analytical; partial documentation",
            "rank": 300,
            "indentLevel": 1,
            "foodNutrientId": 25097024
        },
        {
            "nutrientId": 1079,
            "nutrientName": "Fiber, total dietary",
            "nutrientNumber": "291",
            "unitName": "G",
            "derivationCode": "LCSL",
            "derivationDescription": "Calculated from a less than value per serving size measure",
            "derivationId": 73,
            "value": 1.4,
            "foodNutrientSourceId": 9,
            "foodNutrientSourceCode": "12",
            "foodNutrientSourceDescription": "Manufacturer's analytical; partial documentation",
            "rank": 1200,
            "indentLevel": 3,
            "foodNutrientId": 25097026,
            "percentDailyValue": 3
        },
        {
            "nutrientId": 1087,
            "nutrientName": "Calcium, Ca",
            "nutrientNumber": "301",
            "unitName": "MG",
            "derivationCode": "LCCS",
            "derivationDescription": "Calculated from value per serving size measure",
            "derivationId": 70,
            "value": 371,
            "foodNutrientSourceId": 9,
            "foodNutrientSourceCode": "12",
            "foodNutrientSourceDescription": "Manufacturer's analytical; partial documentation",
            "rank": 5300,
            "indentLevel": 1,
            "foodNutrientId": 25097027,
            "percentDailyValue": 20
        }
    ],
    "image": "https://images.pexels.com/photos/7657406/pexels-photo-7657406.jpeg?auto=compress&cs=tinysrgb&h=130"
}

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it("renders without crashing", function () {
    
    act(() => {
        ReactDOM.render((
            //dummy values where userInfo related state passed in for this test
            <UserContext.Provider value={{userInfoUpdated: false, setUserInfoUpdated: true}}>
                <Food food={food}/>
            </UserContext.Provider>
        ), container);
    });
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <Food />
  );
  expect(asFragment()).toMatchSnapshot();
});