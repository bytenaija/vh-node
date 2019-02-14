/* eslint-disable */
const Actor = require('../models/actor')
const Event = require('../models/event')
let moment = require('moment')
const getAllActors = (req, res) => {
  console.log("Getting")
  Actor.find({}, '-_id -__v').then(actors => {
    let allActors = []
    actors.forEach(async (actor, index) => {

      let events = await Event.find({
        actorId: actor.id
      }, '-_id -__v').sort({
        'created_at': -1
      });

      // console.log(event)
      allActors.push({
        actor,
        events
      })

      if (index === actors.length - 1) {
        allActors = allActors.sort((a, b) => {
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

              return a.actor.login - b.actor.login
            }
          }
        })
        actors = allActors.reduce((resultActors, all) =>{
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
      console.log("Successss")
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
  console.log("streaking")
  res.status(200).json()
};


module.exports = {
  updateActor: updateActor,
  getAllActors: getAllActors,
  getStreak: getStreak
};