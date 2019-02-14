var express = require('express');
var router = express.Router();
let EventsController = require('../controllers/events');
// Routes related to event

router.post('/', EventsController.addEvent)
router.get('/', EventsController.getAllEvents);
router.get('/actors/:actorID', EventsController.getB);

module.exports = router;