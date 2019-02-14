var express = require('express');
var router = express.Router();
const ActionController = require('../controllers/actors');
// Routes related to actor.
router.put('/', ActionController.updateActor);
router.get('/streak', ActionController.getStreak);
router.get('/', ActionController.getAllActors);

module.exports = router;
