'use strict';
/**
 * auth.js
 *
 * Contains the auth() middle ware which handles user authentication
 */
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token});


    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({status: 'Error', reason: `Error Occurred`});
  }
};

module.exports = auth;
