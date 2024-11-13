A.Install Node.js 
  You can download and install it from: https://nodejs.org

B.For this project i'm using Local MongoDB, so install Local MongoDB
  Download MongoDB from: https://www.mongodb.com/try/download/community

C.We need a Text Editor (VS code)


Project Structure is this

/BookExchange
  ├── /backend
  │   ├── /config
  │       ├──db.js
  │   ├── /models
  │       ├──Book.js
  │       ├──ExchangeRequest.js
  │       ├──User.js
  │   ├──middleware
  │       ├──auth.js
  │   ├── /routes
  │       ├──bookRoutes.js
  │       ├──exchangeRoutes.js
  │       ├──userRoutes.js
  │   ├── /controllers
  │       ├── bookController.js
  │       ├──exchangeController.js
  │       ├──UserController.js
  │   ├── index.js
  │   └── .env
  ├── /client
  │   ├── /public
  │   ├── /src
  |      ├──/components
  |        ├──AcceptExchangeRequest.js
  |        ├──AddBookForm.js
  |        ├──AllBookList.js
  |        ├──CreateExchangeRequest.js
  |        ├──ForgotPassword.js
  |        ├──Navbar.css
  |        ├──Navbar.js
  |      ├──/pages
  |        ├──/assets
  |        ├──AuthForm.css
  |        ├──BookListing.css
  |        ├──BookListing.js
  |        ├──Dashboard.css
  |        ├──Dashboard.js
  |        ├──Home.js
  |        ├──Homapage.js
  |        ├──Login.js
  |        ├──Logout.js
  |        ├──Register.js
  |        ├──RestPassword.css
  |        ├──ResetPassword.js
  |        ├──SearchBooks.js
  |      ├──/redux
  |      ├──App.js
  │   └── package.json
  |   
  ├── .gitignore
  └── README.md

Set up for backend:

1. clone this repository to your local machine
   git clone https://github.com/shalini09111999/BookExchangePlatform

2. navigate to backend directory and run this command npm install , to install required dependencies

3. Ensure Mongo DB is installed

4. Ensure we configure environment variables

PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookExchange
JWT_SECRET=*******************
EMAIL_USER=*******************
EMAIL_PASS=*******************

5.`node index.js`
  run this command to start Server and run on http://localhost:5000 and Mango DB to connect


Set up for front end:

1. navigate to client directory and run this command npm install , to install required dependencies

2.`npm start`
  run this command, it runs the app in the development mode.
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

If you're getting CORS errors, make sure you've set up CORS in your Express app (cors middleware):
run this command: 'npm install cors'
Add this in your index.js
const cors = require('cors');
app.use(cors());

