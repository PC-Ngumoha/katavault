'use strict';
/**
 * mongoose.js
 * 
 * Contains the code that tries to connect to the
 * mongodb database running in the background.
 */
const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gqqtb6b.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// Connects to the mongodb database running in the background
mongoose.connect(url);