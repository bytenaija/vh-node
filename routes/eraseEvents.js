var express = require('express');
var router = express.Router();
let EventsController = require('../controllers/events');

// Route related to delete events
router.delete('/', EventsController.eraseEvents);

module.exports = router;
