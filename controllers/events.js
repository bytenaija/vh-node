const events = require('../models/event');
const repos = require('../models/repo');
const actors = require('../models/actor');

var getAllEvents = (req, res) => {
    events.find({}).sort({'id': 'asc'})
    .then(events => res.status(200).json(events))
    .catch(err => res.status(500).json({error: err}));
};

var addEvent = (req, res) => {
    let { event } = req.body;
    let { repo, actor } = event;
    events.find({id: event.id})
    .then(event => {
        if (event) {
            res.status(400).json({error: true, message: 'Event alread exists'});
        } else {
            events.create(
                {
                    id: event.id,
                    type: event.type,
                    actor: actor.id,
                    repo: repo.id,
                    created_at: event.created_at
                }
                ).then(event => {
                    Promise.all([
                        repos.find({id: repo.id}),
                        actors.find({id: actor.id})
                        ]).then(results => {
                            res.status(201).json({success: true, message: 'Successfully added Event'});
                        }).catch(err => {
                             res.status(400).json(err);
                        });
                });
        }
    });
};

var getByActor = (req, res) => {
    events.find({actor: req.params.actorID}).sort({'id': 'asc'})
    .populate('actor')
    .populate('repo')
    .then(events => {
        if(events){
            res.status(200).json()
        }else{
            e
        }
        
    })
};

var eraseEvents = (req, res) => {
    events.remove({}).then(result => res.status(200).json());
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
