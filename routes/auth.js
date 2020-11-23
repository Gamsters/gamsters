const express = require('express');
const router = express.Router();
// const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

module.exports = router;