'use strict';
/**
 * pinata-config.js
 *
 * Contains the code necessary to setup Pinata in this project
 */
require('dotenv').config();
const pinataSDK = require('@pinata/sdk');
const {PINATA_API, PINATA_SECRET} = process.env;
const pinata = new pinataSDK({
  pinataApiKey: PINATA_API,
  pinataSecretApiKey: PINATA_SECRET
});

module.exports = pinata;
