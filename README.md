# Welcome to pizza order composer

- It's a basic app for ordering pizza, Enjoy!

# Techonologies

- MERN stack app (MongoDB, Express, React and NodeJS with Mongoose)

# To run it you should

- git clone https://github.com/MirsadZagrljaca/pizza-order
- cd client && npm install && npm start and open browser at localhost:3000
- cd server && npm install && npm start

# Dependecies

## Server

### devDepencies

- babel-core
- babel-loader
- babel-preset-env
- babel-preset-stage-2
- nodemon
- webpack
- webpack-cli
- webpack-node-externals

### dependecies

- body-parser
- compression
- cookie-parser
- cors
- crypto
- express
- express-jwt
- helmet
- jsonwebtoken
- lodash
- mongoose

## Client

- axios
- bootstrap
- bootstrap-icons
- react
- react-bootstrap
- react-dom
- react-router
- react-router-dom
- react-scripts
- web-vitals

# File names explained

## client

- pizza.png - pizza icon
- api-dough.js - crud for dough
- api-ingredients.js - crud for ingredients
- api-auth.js - signin, signout requests
- auth-helper.js - operations to check if authorised
- Header.js - header component
- History.js - /history route
- HistoryItem.js - single item used for mapping through past orders
- Dough.js - component used for mapping doughs
- Homepage.js - "/" home route main file
- Ingredients.js - component used for mapping ingredients in modal
- OrderList - file to show current order details
- SigninModal.js - modal for signing in
- SignupModal.js - modal for creating account
- Order.js - "/order" main route file
- api-user.js - crud for users
- App.js - main app file
- config.js - config variables
- index.css - main css file
- index.js - main app file

## server

- config.js - config variables
- auth.controller.js - crud for authorised routes on backend
- dough.controller.js - crud for doughs on backend
- ingredients.controller.js - crud for ingredients on backend
- user.controller.js - crud for users on backend
- dbErrorHandler.js - error messages from db
- user.model.js - mongoose schema for users
- auth.routes.js - routing for authorised
- dough.routes.js - routing for doughs
- ingredients.routes.js - routing for ingredients
- user.routes.js - routing for users
- express.js - main express file
- server.js - main server file
