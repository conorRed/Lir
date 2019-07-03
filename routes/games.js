const express = require('express');
const router = express.Router();

const game_controller = require('../controllers/gamesController.js');

router.get('/', game_controller.display_games);
