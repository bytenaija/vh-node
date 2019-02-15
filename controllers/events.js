const Repo = require('../models/repo');
const Actor = require('../models/actor');
const Event = require('../models/event');
/* eslint-disable */
var getAllEvents = (req, res) => {
    Event.find({}).sort({
      'id': 'asc'
    }).populate('actor', '-_id -__v').populate('repo', '-_id -__v')
    .then(events => {

      if(events){

          res.status(200).json(events)
      }

    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({
        error: err
      })
    }

      );
};

var addEvent = (req, res) => {

    let  event  = req.body;

    let { repo, actor } = event;
    repo.event = event.id;
    actor.event = event.id
    console.log(actor)
    Event.find({id: event.id})
    .then(eventResult => {

        if (eventResult.length > 0) {

            res.status(400).json({error: true, message: 'Event alread exists'});
        } else {
            Event.create(
                {
                    id: event.id,
                    type: event.type,
                    actorId: actor.id,
                    repoId: repo.id,
                    created_at: event.created_at
                }
                ).then(event => {
                    return Promise.all([
                        Repo.findOne({id: repo.id}).then(repoResult =>{

                          if (repoResult) {
                            return Promise.resolve()
                          }else{
                            return Repo.create(repo)
                          }
                        }),
                        Actor.findOne({id: actor.id}).then(actorResult =>{

                          if (actorResult) {
                            return Promise.resolve()
                          } else {
                            return Actor.create(actor)
                          }
                        })
                        ]).then(results => {
                            res.status(201).json({success: true, message: 'Successfully added Event'});
                        }).catch(err => {
                          console.log(err)

                             res.status(400).json(err);
                        });
                }).catch(err => {
                  console.log(err);
                  res.status(400).json(err);
                });
        }
    }).catch(err =>{
      console.log(err);
       res.status(400).json(err);
    });
};

var getByActor = (req, res) => {
    Event.find({actorId: req.params.actorID}).sort({'id': 'asc'})
    .populate('actor', '-_id -__v')
    .populate('repo', '-_id -__v')
    .then(events => {
        if (events) {

            res.status(200).json(events);
        } else {
            res.status(404).json({success: false, message: 'Event of that ID not available'});
        }
    }).catch(err => {
        res.status(500).json({success: false, message: 'An error occured. Pleas try again later'});
    });
};

var eraseEvents = (req, res) => {
  console.log("erasing")
    Event.deleteMany({}).then(result => res.status(200).json());
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
