const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { loginCheck } = require('./middlewares');

router.get('/collections', (req, res, next) => {
  const loggedInUser = req.user;
  res.render('games/collections',  { user: loggedInUser });
});

router.get('/top10', (req, res, next) => {
  const loggedInUser = req.user;
  res.render('games/top10', { user: loggedInUser });
});



module.exports = router;