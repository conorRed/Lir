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
  (req, res) =>{res.render('dashboard', { user: req.user, games: req.games })
});

router.get('/admin', ensureAuthenticated, (req, res) => 
  res.render('admin', {user: req.user}));

router.get('/games', ensureAuthenticated, game_controller.index);

module.exports = router;
