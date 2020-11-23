const express = require('express');
const router  = express.Router();
const User = require('../models/User');


// general game search by game's name
app.get('/my_games/search', (req, res) => {
  //req params
  const searchedGame = games.filter(game => game // we might to have to change that all to the API ;D
    .title
    .toLowerCase()
    .includes(req.query.q.toLowerCase())
    );
    console.log(searchedGame);
    res.render('/my_games/games_list', {games:searchedGame})
})

// result page of games searched by name
app.get('/my_games/search', (req, res) => {
res.render()
});


// list of my games




// export these routes
module.exports = router;