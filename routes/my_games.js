const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');
const { loginCheck } = require('./middlewares');
var flash = require('connect-flash');
var helpers = require('handlebars-helpers');
var number = helpers.number();

// general game search by game's name
router.get('/my_games', loginCheck(), (req, res) => {
  const loggedInUser = req.user;
  const myGames = req.user.games;
  console.log(req.user.games);
  res.render('my_games/index', { user: loggedInUser, games: myGames });
});

// result page of games searched by name
router.get('/game_search_by_name', loginCheck(), (req, res) => {
  const loggedInUser = req.user;
  const searchedGame = req.query.q.toLowerCase();
  console.log(searchedGame);
  axios
    .get(
      `https://api.boardgameatlas.com/api/search?client_id=Bb6pHO9yhc&fuzzy=true&name=` +
        searchedGame
    )
    .then((game) => {
      res.render('my_games/search_results', {
        games: game.data.games,
        user: loggedInUser,
      });
    })
    .catch((err) =>
      console.log('Error while searching for game by name occured: ', err)
    );
});

// just in case anybody stumbles upon this page?
router.get('/my_games/search_results', loginCheck(), (req, res) => {
  const loggedInUser = req.user;
  res.render('my_games/search_results', { user: loggedInUser });
});

router.get('/game_details/:id', async (req, res) => {
  const clickedGameId = req.params.id;
  const loggedInUser = req.user;
  const gameResponse = await axios.get(
    `https://www.boardgameatlas.com/api/search?ids=${clickedGameId}&client_id=JLBr5npPhV`
  );

  gameResponse.data.games[0].average_user_rating = gameResponse.data.games[0].average_user_rating.toFixed(2);
  // console.log('game response ', gameResponse.data.games[0]);
  let videoResponse = await axios.get(
    `https://www.boardgameatlas.com/api/game/videos?game_id=${clickedGameId}&client_id=JLBr5npPhV`
  );
  // console.log('gameResponse', gameResponse);
  // console.log('videoResponse', videoResponse.data.videos[0].url);
  gameResponse.data.games[0].video = videoResponse.data.videos[0].url;
  res.render('games/game_details', {
    game: gameResponse.data.games,
    user: loggedInUser,
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/add_game/:id', (req, res) => {
  const clickedGameId = req.params.id;
  axios
    .get(
      `https://www.boardgameatlas.com/api/search?ids=${clickedGameId}&client_id=JLBr5npPhV`
    )
    .then((response) => {
      const {
        id,
        name,
        image_url,
        min_playtime,
        max_playtime,
        min_players,
        max_players,
        min_age,
      } = response.data.games[0];
      // console.log(response.data.games[0]);
      console.log(req.user.id);
      User.findByIdAndUpdate(req.user.id, {
        $push: {
          games: {
            id: id,
            name: name,
            image_url: image_url,
            min_playtime: min_playtime,
            max_playtime: max_playtime,
            min_players: min_players,
            max_players: max_players,
            min_age: min_age,
          },
        },
      })
        .then(() => {
          res.redirect(`/my_games`);
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

router.post('/delete_game/:id', (req, res) => {
  console.log(req.params.id);

  User.findByIdAndUpdate(req.user.id, {
    $pull: {
      games: {
        _id: req.params.id,
      },
    },
  })
    .then(() => {
      res.redirect(`/my_games`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// export these routes
module.exports = router;
