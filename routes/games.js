const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/collections', (req, res, next) => {
  res.render('games/collections');
});

router.get('/top10', (req, res, next) => {
  res.render('games/top10');
});









module.exports = router;