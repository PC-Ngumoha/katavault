'use strict';
/**
 * mongoose.js
 * 
 * Contains the code that tries to connect to the
 * mongodb database running in the background.
 */
const mongoose = require('mongoose');
require('dotenv').config();

// Connects to the mongodb database running in the background
mongoose.connect(process.env.DB_URL);