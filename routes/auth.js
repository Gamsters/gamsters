const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    res.render('signup', { message: 'Your password must be 8 chars min' });
    return;
  }
  if (username === '') {
    res.render('signup', { message: 'You username cannot be empty' });
  }
  User.findOne({ username: username }).then((found) => {
    if (found !== null) {
      res.render('signup', { message: 'This username is already taken' });
    } else {
      const salt = bcrypt.genSaltSync();
      console.log(salt);
      const hash = bcrypt.hashSync(password, salt);
      User.create({ username: username, password: hash })
        .then((dbUser) => {
          req.login(dbUser, (err) => {
            if (err) next(err);
            else res.redirect('/');
          });
          res.redirect('login');
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    }
  });
});

module.exports = router;