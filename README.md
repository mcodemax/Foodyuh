# Foodyuh
Make and analyze your plate.
###### Developer: Maxwell Johnson

[Link to Foodyuh, see the deployed App!](https://foodyuh.surge.sh/) 

![image of UI](https://user-images.githubusercontent.com/63630792/162107405-af0e3cde-c66a-4bb4-9b70-4f9b1c80fa23.png)

Description: A website where users can create several plates or "Portfolios" of food and have a nutritional analysis of all components combined.

### Features:
- **Create multiple plates**: Users can create multiple plates with different foods.
    
### Basic user flow:
1. User must create a Foodyuh account to use Foodyuh. 
2. After registering, users can create plates made of > individual foods.
3. Within a plate a user can see the nutritional summary of a plate.

### APIs used: 
1. FoodData Central API:
    - Root URL: https://fdc.nal.usda.gov/
    - [Docs](https://fdc.nal.usda.gov/api-guide.html)
2. Pexels:
    - Root URL: https://www.pexels.com/api/
    - [Docs](https://www.pexels.com/api/documentation/)
    
### Tech stack:
- Front-end: HTML, Sass, JS, React, Axios, Formik
- Backend: Node.js, Express, Bcrypt     [See Backend Repo](https://github.com/mcodemax/Foodyuh-backend)
- Database: PostgresQL
- Front-end Deployment: Surge
- Back-end Deployment: Heroku

To install required frontend depencies, run the following in terminal:

`npm i`

Then run the backend server by typing `nodemon` or `nodemon FILE_NAME`

### Possible features to add:
- **Payment Integration with Stripe**: Gate keep routes that a user must pay for.
