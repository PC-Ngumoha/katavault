'use strict';
/**
 * user.js
 *
 * Contains the routes details for 'User' access
 */
const express = require('express');
// const bcrypt = require('bcrypt');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');

const router = new express.Router();

router.use(
  fileUpload({
    createParentPath: true
  })
);

const {
  uploadFileToServer,
  uploadToIPFS,
  removeUploadsDir
} = require('../utils/upload.js');

const {
  retrieveFilesFromBlockchain,
  addFileToBlockchain
} = require('../utils/contract.js');

// router.get('/', (req, res) => {});

//FIXME: This is simply a test route
// TODO: Clean out this route definition when done with testing.
router.get('/listAllUsers', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send({error: 'Database Error'});
  }
});

// POST /login -> Login an existing user
router.post('/users/login', async (req, res) => {
  try {
    const {regNumber, email, password} = req.body;
    const user = await User.findByCredentials(regNumber, email, password);
    const token = await user.getAuthToken();
    res.send({status: 'OK', user, token}); // Returns the logged in user
  } catch (e) {
    res.status(404).send({status: 'Error', error: e.message});
  }
});

// POST /users/logout -> Logs out the current user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send({status: 'Error'});
  }
});

// POST /register -> Register a new user
router.post('/users/register', async (req, res) => {
  const user = new User(req.body);

  // Try to add the user to the db
  try {
    await user.save();
    const token = await user.getAuthToken();
    res.status(201).send({status: 'Ok', user, token});
  } catch (e) {
    res.status(500).send({status: 'Error', message: e.message});
  }
});

// POST /users/file_upload -> Handles file uploads to the blockchain
// by the user
router.post('/users/file_upload', auth, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({error: 'No File Uploaded'});
  }
  let file = req.files.file;
  try {
    file = await uploadFileToServer(file);
    file = await uploadToIPFS(file);
    console.log(file);
    await addFileToBlockchain(req.user._id.toString(), file);
    removeUploadsDir();
    res.send();
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
});

//GET /users/me -> Displays a specific user's info
router.get('/users/me', auth, async (req, res) => {
  const results = await retrieveFilesFromBlockchain(req.user._id.toString());
  // console.log(result.fileName, result.fileHash, result.fileLink);
  const files = [];
  for (let i = 0; i < results.length; i++) {
    files.push({
      name: results[i][0],
      hash: results[i][1],
      link: results[i][2]
    });
  }
  // console.log(files);
  res.send({user: req.user, files});
});

module.exports = router;
