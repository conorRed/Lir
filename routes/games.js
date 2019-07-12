const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const game_controller = require('../controllers/gamesController.js');

router.get('/', game_controller.index);

router.get('/create', game_controller.game_create_get);

router.post('/create', game_controller.game_create_post);

router.get('/:id', ensureAuthenticated, game_controller.game_show_get);

module.exports = router;
