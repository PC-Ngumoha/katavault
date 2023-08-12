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
// const path = require('path');
const userRouter = require('./routers/user.js');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server up and running @ port ${process.env.PORT}`);
});
