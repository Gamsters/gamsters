const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { loginCheck } = require('./middlewares');
const axios = require('axios');


router.get('/collections', (req, res, next) => {
  const loggedInUser = req.user;
  res.render('games/collections',  { user: loggedInUser });
});

router.get('/top10', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?ascending=false&limit=10&client_id=JLBr5npPhV'
  );
  console.log(gameResponse.data.games);
  res.render('games/top10', { user: loggedInUser, games: gameResponse.data.games });
});

router.get('/love_to_hate', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?order_by=average_user_rating&ascending=true&limit=10&client_id=JLBr5npPhV'
  );
  console.log(gameResponse.data.games);
  res.render('games/love_to_hate', { user: loggedInUser, games: gameResponse.data.games });
});

router.get('/talking_about', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?order_by=reddit_week_count&limit=10&client_id=JLBr5npPhV'
  );
  console.log(gameResponse.data.games);
  res.render('games/talking_about', { user: loggedInUser, games: gameResponse.data.games });
});

router.get('/scary_games', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?categories=cAIkk5aLdQ&limit=10&client_id=JLBr5npPhV'
  );
  console.log(gameResponse.data.games);
  res.render('games/scary_games', { user: loggedInUser, games: gameResponse.data.games });
});


module.exports = router;