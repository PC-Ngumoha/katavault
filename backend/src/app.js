'use strict';
/**
 * app.js
 * 
 * Contains the main app route for the API
 * Helps me test which features in development
 */
const express = require('express');
require('dotenv').config();
require('./db/mongoose.js');
const hbs = require('hbs');
const path = require('path');
const userRouter = require('./routers/user.js');

const app = express();

const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Enables express to work with static data and assets.
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(userRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server up and running @ port ${process.env.PORT}`);
});