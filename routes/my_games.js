const express = require('express');
const router  = express.Router();
const User = require('../models/User');


// general game search by game's name
router.get('/', (req, res) => {
res.render('index')
});

// result page of games searched by name
router.get('/game_search_by_name', (req, res) => {
  const searchedGame = req.query.q
    .toLowerCase()
    .includes(req.query.q.toLowerCase())
    console.log(searchedGame);
axios.get(`https://api.boardgameatlas.com/api/search?name=${searchedGame}&client_id=Bb6pHO9yhc&fuzzy_match`)
    .then(game => {
     console.log(game);
    res.render('search_results', {games:searchedGame.games}) // do I need to add /my_games in front of the search results?
  })
    .catch(err => console.log('Error while searching for game by name occured: ', err));
})






// list of my games




// export these routes
module.exports = router;