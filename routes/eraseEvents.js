var express = require('express');
var router = express.Router();
let EventsController = require('../controllers/events')

// Route related to delete events
router.delete('/erase', EventsControllere)

module.exports = router;