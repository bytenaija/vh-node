const events =  require('../models/event')
var getAllEvents = (req, res) => {
    events.find({}).then(events => res.status(200).)
};

var addEvent = () => {

};


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















