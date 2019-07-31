const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const game_controller = require('../controllers/gamesController');

router.get('/', (req, res) => {
  res.render('welcome')
})

module.exports = router;
