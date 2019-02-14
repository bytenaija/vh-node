const events =  require('../models/event');
const repos =  require('../models/repo');
const actors =  require('../models/actor');

var getAllEvents = (req, res) => {
    events.find({}).sort({'_id': 'asc'})
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json({error: err}));
};

var addEvent = (req, res) => {
    let { event } = req.body;
    let { repo, actor } = event;
    events.
};

var getByActor = () => {

};


var eraseEvents = (req, res) => {
    events.remove({}).then(result => res.status(200).json())
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















