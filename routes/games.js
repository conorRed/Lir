const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const game_controller = require('../controllers/gamesController.js');
const team_controller = require('../controllers/teamsController.js');

router.get('/', ensureAuthenticated, game_controller.index);

router.get('/create', ensureAuthenticated,
  team_controller.team_index_get,
  game_controller.game_create_get);

router.post('/create', ensureAuthenticated, game_controller.game_create_post);

router.get('/:id', ensureAuthenticated, game_controller.game_show_get);

module.exports = router;
