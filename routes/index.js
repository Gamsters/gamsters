const express = require('express');
const router  = express.Router();
const axios = require('axios');


/* GET home page */
router.get('/', (req, res, next) => {
  const loggedInUser = req.user;
  res.render('index', { user: loggedInUser });
});



router.get('/game_details', (req, res) => {
  const loggedInUser = req.user;
  let url = 'https://api.boardgameatlas.com/api/search?client_id=Bb6pHO9yhc&'
  const time = req.query.time
  const players = req.query.players

    console.log(time);
    if (time) {
      url += time;
    }
    if (player) {
      url += player;
    }
    console.log(url);

    axios.get(url)
    .then(game => {
     console.log(time);
    res.render('my_games/search_results', {games:game.data.games, user: loggedInUser})
  })
    .catch(err => console.log('Error while searching for game occured.', err));
})























module.exports = router;
