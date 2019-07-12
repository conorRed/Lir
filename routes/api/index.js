const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../../config/auth');
const events_controller = require('../../controllers/eventsController.js')

router.get('/events/:gameid', events_controller.api_event_show_get)
router.get('/events/create', events_controller.api_event_create_post )

module.exports = router;
