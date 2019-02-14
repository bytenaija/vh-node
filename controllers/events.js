const events =  require('../models/event')
var getAllEvents = (req, res) => {
    events.find({}).sort({'_id': 'asc'})
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json({error: err}));
};

var addEvent = () => {

};


var getByActor = () => {

};


var eraseEvents = () => {
    events.remove({}).then
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















