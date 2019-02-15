const Repo = require('../models/repo');
const Actor = require('../models/actor');
const Event = require('../models/event');
/* eslint-disable */
var getAllEvents = (req, res) => {
    Event.find({}).sort({
      'id': 'asc'
    }).populate('actor', '-_id -__v -events').populate('repo', '-_id -__v -events')
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
                            console.log("contanssss", repoResult.events.includes(repo.event))
                            if (repoResult.events.includes(repo.event)){
                              return Promise.resolve()
                            }else{
                              repoResult.events.push(repo.event)
                              repoResult.save()
                              return Promise.resolve()
                            }

                          }else{

                           return Repo.create(repo).then(repoResult => {
                             repoResult.events.push(repo.event);
                             repoResult.save();
                             return Promise.resolve();
                           })
                          }
                        }),
                        Actor.findOne({id: actor.id}).then(actorResult =>{

                          if (actorResult) {
                            if (actorResult.events.includes(actor.event)) {
                              return Promise.resolve()
                            }
                             actorResult.events.push(actor.event)
                             actorResult.save()
                            return Promise.resolve()
                          } else {
                            return Actor.create(actor).then(actorResult =>{
                              actorResult.events.push(actor.event);
                              actorResult.save()
                              return Promise.resolve();

                            })
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
    .populate('actor', '-_id -__v -events')
    .populate('repo', '-_id -__v -events')
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
   Event.find({}).then(events =>{
     let eventLength = events.length;
      events.forEach(async (event, index) => {

       await event.remove();

        if (index == eventLength -1) {

            res.status(200).json()
        }
      });
    })


};
// "pretest": "npm install",
module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};
