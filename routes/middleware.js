// when using this don't forget to add this to the route that you are using it with 
// const { loginCheck } = require('./middlewares');

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login')
    } 
  }
}

module.exports = {
  loginCheck: loginCheck
}