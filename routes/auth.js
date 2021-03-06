const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { loginCheck } = require('./middlewares');
const flash = require('connect-flash');

router.get('/signup', (req, res) => {
  const loggedInUser = req.user;
  res.render('auth/signup', { user: loggedInUser });
});

router.get('/login', (req, res) => {
  const loggedInUser = req.user;
  res.render('auth/login', { user: loggedInUser });
});

router.get('/login_fail', (req, res) => {
  res.render('auth/login_fail', {
        message: 'Login failed: Invalid username or password',
      });
});

router.get('/google', passport.authenticate('google'));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/my_games',
    failureRedirect: '/login_fail',
  })
);

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    res.render('auth/signup', { message: 'Your password must be 8 chars min' });
    return;
  }
  if (username === '') {
    res.render('auth/signup', { message: 'You username cannot be empty' });
  }
  User.findOne({ username: username }).then((found) => {
    if (found !== null) {
      res.render('auth/signup', { message: 'This username is already taken' });
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

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login_fail',
    passReqToCallback: true,
  })
);

// router.post('/login', (req, res, next) => {
//   const { username, password } = req.body;
//   User.findOne({ username: username })
//     .then((found) => {
//       console.log(found);
//       if (found === null) {
//         res.render('auth/login', { message: 'Invalid credentials' });
//       }
//       if (bcrypt.compareSync(password, found.password)) {
//         req.username = found;
//         res.redirect('/');
//       } else {
//         res.render('auth/login', { message: 'Invalid credentials' });
//       }
//     })
//     .catch((err) => {
//       res.render('auth/login', { message: 'Invalid credentials. Please try again' })
//       console.log(err);
//     });
// });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
