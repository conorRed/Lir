const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../config/auth');
const user_controller = require('../controllers/usersController.js')
const team_controller = require('../controllers/teamsController.js')

router.get('/', verifyAdmin, 
  user_controller.user_show_get,
  team_controller.team_index_get, (req, res) => {
    res.render('admin/dashboard')
});

module.exports = router
