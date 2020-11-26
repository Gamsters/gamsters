const express = require('express');
const router  = express.Router();
const axios = require('axios');



// const generateOneGame = theOneGame => {

//   axios

//     .get(`https://restcountries.eu/rest/v2/name/${countryName}`)

//     .then(response => {

//       console.log('Response from API is: ', response);

//       const countryDetail = response.data[0];

//       console.log('time is ', countryDetail);

//     })

//     .catch(err => console.log(err));

// };

 

// document.getElementById('generate-game-btn').addEventListener('click', () => {

//   const time = document.getElementById('time').value;
//   console.log(time)

//   // getCountryInfo(userInput);

// });

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
  const age = req.query.age   

    console.log(time);
    if (time) {
      url += time;
    }
    if (player) {
      url += player;
    }
    if (age) {
      url += age;
    }
    axios.get(url)
    .then(game => {
     console.log(time);
    res.render('my_games/search_results', {games:game.data.games, user: loggedInUser})
  })
    .catch(err => console.log('Error while searching for game occured.', err));
})























module.exports = router;
