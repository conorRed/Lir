const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const game_controller = require('../controllers/gamesController');

router.get('/', (req, res) => {
  res.render('welcome')
})

// Dashboard
router.get('/dashboard', ensureAuthenticated,
  game_controller.list_games,
  (req, res) =>{
    res.render('dashboard', { games: req.games })
}); 

module.exports = router;
