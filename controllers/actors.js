/* eslint-disable */
const Actor = require('../models/actor')
const Event = require('../models/event')
let moment = require('moment')
const getAllActors = (req, res) => {
  console.log("Getting")
  Actor.find({}, '-_id -__v -event').then(actors => {
    let allActors = []

    actors.forEach(async (actor, index) => {

      let events = await Event.find({
        actorId: actor.id
      }, '-_id -__v').sort({
        'created_at': -1
      });

      allActors.push({
        actor,
        events
      })


      if (index === actors.length - 1) {
        console.log(allActors.length)
        allActors = allActors.sort((a, b) => {
          if (a.events) {
            if (a.events.length > b.events.length) {
              return false
            } else if (b.events.length > a.events.length) {
              return true
            } else {
              // console.log("time diff", moment(a.events[0].created_at).diff(b.events[0].created_at), a.events[0].created_at, b.events[0].created_at)
              let timeDiff = moment(a.events[0].created_at).diff(b.events[0].created_at);
              if (timeDiff > 0) {

                return false;
              } else if (timeDiff < 0) {

                return true
              } else {

                return a.actor.login > b.actor.login
              }
            }
          } else {
            return a.actor.login < b.actor.login
          }

        })
        actors = allActors.reduce((resultActors, all) => {
            resultActors.push(all.actor)
            return resultActors;
          },
          [])


        res.status(200).json(actors)
      }
    })




  })

};

const updateActor = (req, res) => {
  console.log("updating")
  const {
    id,
    avatar_url,
    login
  } = req.body;
  Actor.findOneAndUpdate({
      id
    }, req.body)
    .then(actor => {
      res.status(200).json()
    }).catch(err => {
      console.log(err)
      console.log(err)
      if (login) {
        res.status(400).json()
      } else {
        res.status(401).json()
      }
    })
};

const getStreak = (req, res) => {
  Actor.find({}, '-_id -__v').then(actors => {
    let allActors = []
    actors.forEach(async (actor, index) => {
      console.log(actor)
      let oneEvent = await Event.findOne({
        id: actor.event
      });

      allActors.push({
        actor,
        event: oneEvent.created_at
      });
      console.log(index, actors.length - 1, index == actors.length - 1)
      if (index == actors.length - 1) {
        console.log(allActors.length)
        allActors.sort((a, b) => {
          let count = {}
          if (a.actor.login === b.actor.login) {
            if (moment(a.event).startOf('day').diff(moment(b.event).startOf('day'), 'day') == 1 || moment(a.event).add(1, 'day').startOf('day').diff(moment(b.event).startOf('day'), 'day') == -1) {
              return true;
            } else {
              return false;
            }
          } else {
            if (moment(a.event).diff(moment(b.event)) > 0) {
              return false;
            } else if (moment(a.event).diff(moment(b.event)) < 0) {
              return true
            } else {
              return a.actor.login > b.actor.login
            }
          }
        })
        allActors = allActors.reduce(function (actors, oneActor) {

          let {
            actor
          } = oneActor;
          actor = {
            id: actor.id,
            login: actor.login,
            avatar_url: actor.avatar_url
          }

          actors.push(actor)
          return actors;
        }, []);

        res.status(200).json(allActors)
      }
    })


  })

}


module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak
};