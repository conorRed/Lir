const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const event_controller = require('../controllers/eventsController.js');


// event type gets passed as hidden varibale
router.post('/create', event_controller.event_create_post)
router.post('/update', event_controller.event_update_post)
router.post('/delete', event_controller.event_delete_post)

module.exports = router;
