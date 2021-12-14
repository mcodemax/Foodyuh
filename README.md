# Foodyuh
A portfolio. For your diet.
###### Developer: Maxwell Johnson

[Link to Foodyuh](https://github.com/mcodemax/Foodyuh#readme) 

Description: A website where users can create a several plates or "Portfolios" of food and have a nutritional analysis of all components combined.

### Features:
- **Create multiple plates**: Users can create multiple plates with different foods.
    
### Basic user flow:
1. User must create a Foodyuh account to use Foodyuh. 
2. After registering, users can create meals made of > plates make of > individual foods.
3. Following plate creation users can combine different plates they have made and add them to different meals they have in their account.


### APIs used: 
1. Alpha Vantage:
    - Root URL: https://fdc.nal.usda.gov/
    - [Docs](https://fdc.nal.usda.gov/api-guide.html)
2. Pexels:
    - Root URL: https://www.pexels.com/api/
    - [Docs](https://www.pexels.com/api/documentation/)
    
### Tech stack:
- Front-end: HTML, CSS, JS, React, Axios, Bootstrap, Font Awesome, Formik
- Backend: Express, WTForms, Bcrypt
- Database: PostgresQL
- Deployment: Heroku

To access required tools, run the following in terminal:

`python3 -m venv venv`

`source venv/bin/activate`

`pip install -r requirements.txt`

Then run the backend server by typing `nodemon` or `nodemon FILE_NAME`

**The code in this repo is written specifically for deployment purposes. In order to interact with the code locally on your machine, you must do the following:**
1. Create a file `secret_codes.py` and define the `ALPHA_VAN_API_KEY` and `SECRET_KEY` variables according to your own dev environment.
    - Add to `.gitignore` file
2. Uncomment out secretcodes import in app.py
3. change xxx to SECRET_KEY in line 30 of app.py ... where it says app.config['SECRET_KEY']
4. change ALPHA_VAN_API_KEY const declaration line in app.py

### Possible features to add:
- **Payment Integration with Stripe**: Gate keep routes that a user must pay for.