const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const team_controller = require('../controllers/teamsController.js');

router.get('/:id', ensureAuthenticated, team_controller.team_show_get);
router.get('/', ensureAuthenticated, team_controller.team_index_get);
router.post('/create', ensureAuthenticated, team_controller.team_create_post);

module.exports = router;
