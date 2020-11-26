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
  // console.log(gameResponse.data.games);
  res.render('games/top10', { user: loggedInUser, games: gameResponse.data.games });
});

router.get('/love_to_hate', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?order_by=average_user_rating&ascending=true&limit=10&client_id=JLBr5npPhV'
  );
  // console.log(gameResponse.data.games);
  res.render('games/love_to_hate', { user: loggedInUser, games: gameResponse.data.games });
});

router.get('/talking_about', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?order_by=reddit_week_count&limit=10&client_id=JLBr5npPhV'
  );
  // console.log(gameResponse.data.games);
  res.render('games/talking_about', { user: loggedInUser, games: gameResponse.data.games });
});

router.get('/scary_games', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?categories=cAIkk5aLdQ&limit=10&client_id=JLBr5npPhV'
  );
  // console.log(gameResponse.data.games);
  res.render('games/scary_games', { user: loggedInUser, games: gameResponse.data.games });
});

router.get('/single_player', async (req, res, next) => {
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    'https://api.boardgameatlas.com/api/search?max_players=1&gt_price=7&limit=100&order_by=price&ascending=true&client_id=JLBr5npPhV'
  );
  const gameResponseOnly10 = gameResponse.data.games.slice(0,10)
  console.log('length of array', gameResponseOnly10.length);
  res.render('games/single_player', { user: loggedInUser, games: gameResponseOnly10 });
});

router.get('/ironhack_favorites', async (req,res, next ) => {
  const loggedInUser = req.user
  const ironhackFavorites = [
    {
      name: 'Jan',
      gameId: '3hnL2wtWnM'
    },
    {
      name: 'Kara',
      gameId: 'nHJNyAWsoo'
    },
    {
      name: 'njan',
      gameId: '1dWE5BIcOm'
    },
    {
      name: 'Katie',
      gameId: 'Qq2rPNOpoO'
    },
    {
      name: 'Facundo',
      gameId: 'XHwWvUwPfl'
    }
  ];
  const gameIds = ironhackFavorites.map(a => a.gameId);
  idsOnly = gameIds.toString()
  // console.log(idsOnly);
  const gameResponse = await axios.get(`https://api.boardgameatlas.com/api/search?ids=${idsOnly}&client_id=JLBr5npPhV`)
  let gameArray = gameResponse.data.games
  for(let i = 0; i <gameArray.length; i++) { 
    // console.log('each game in array', gameArray[i].id);
    for(let k = 0; k < ironhackFavorites.length; k++) { 
      // console.log('each ironhacker object', ironhackFavorites[k].gameId)
      if(gameArray[i].id === ironhackFavorites[k].gameId){
        // console.log('MATCH', ironhackFavorites[k].name);
        gameArray[i].ironhacker = ironhackFavorites[k].name
        // console.log('new key', gameArray[i].ironhacker);
      }
    }
  }
  // console.log('names', ironhackFavorites[0].name);
  // console.log(gameResponse.data.games);
  res.render('games/ironhack_favorites', { user: loggedInUser, games: gameResponse.data.games })
})

module.exports = router;