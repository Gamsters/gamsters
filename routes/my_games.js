const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const axios = require('axios');


// general game search by game's name
router.get('/my_games', (req, res) => {
res.render('my_games/index')
});

// result page of games searched by name
router.get('/game_search_by_name', (req, res) => {
  const searchedGame = req.query.q
    .toLowerCase()
    console.log(searchedGame);
axios.get(`https://api.boardgameatlas.com/api/search?client_id=Bb6pHO9yhc&fuzzy=true&name=`+searchedGame)
    .then(game => {
     console.log(game.data.games);
    res.render('my_games/search_results', {games:game.data.games})
  })
    .catch(err => console.log('Error while searching for game by name occured: ', err));
})


// just in case anybody stumbles upon this page?
router.get('/my_games/search_results', (req, res) => {
res.render('my_games/search_results')
})

router.get('/game_details/:id', (req, res) => {
  const gameId = req.params.id
  axios.get(`https://www.boardgameatlas.com/api/search?ids=${gameId}&client_id=JLBr5npPhV`)
  .then(response => {
    console.log(response.data.games);
    res.render('games/game_details', {game: response.data.games})
    console.log('this is what the hbs is trying to access'+game)
  })
})

// export these routes
module.exports = router;