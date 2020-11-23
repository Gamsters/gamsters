const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  const loggedInUser = req.user;
  console.log(loggedInUser);
  res.render('index', { user: loggedInUser });
});

module.exports = router;
