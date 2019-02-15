const mongoose = require('mongoose');
const moment = require('moment');
const Actor = require('./actor')
const Repo = require('./repo')

/* eslint-disable */
const EventSchema = mongoose.Schema({
  id: Number,
  type: String,
  actorId: String,
  repoId: String,
  created_at: Date
},
{
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
       ret.created_at = moment(ret.created_at).format('YYYY-MM-DD HH:mm:ss')
  },
  },
  toJSON: {
    virtuals:true,
    transform: (doc, ret) => {
      delete ret.__v;
      ret.created_at = moment(ret.created_at).format('YYYY-MM-DD HH:mm:ss')
    },
  }
}
  );


   EventSchema.pre('remove', async function (next) {

    await mongoose.model('Actor').findOne({
      id: this.actorId
    }).then(actor => {

      if(actor){
        if (actor.events.length > 1) {

          actor.events = actor.events.filter(event => event.toString() !== this.id.toString())

          if (actor.events.length > 0) {
            return actor.save();
          } else {
           return actor.remove();
          }
          return Promise.resolve()
        } else {

         return mongoose.model('Actor').deleteOne({ id: this.actorId });

        }
      };
      });


     await mongoose.model('Repo').findOne({
       id: this.repoId
     }).then(repo => {

       if (repo) {
         if (repo.events.length > 1) {

           repo.events = repo.events.filter(event => event.toString() !== this.id.toString())

           if(repo.events.length > 0){
            return repo.save();
           }else{
            return repo.remove();
           }

         } else {

          return mongoose.model('Repo').deleteOne({ id: this.repoId });

         }
       };
     });

    next()
  });

EventSchema.virtual('actor', {
  ref: 'Actor',
  localField: 'actorId',
  foreignField: 'id',
  justOne: true
});

EventSchema.virtual('repo', {
  ref: 'Repo',
  localField: 'repoId',
  foreignField: 'id',
  justOne: true
});

EventSchema.methods.toJSON =  function (){
  const obj = this.toObject();
  delete obj.__v;
  delete obj._id;
  delete obj.actorId;
  delete obj.repoId;
  return obj;
}


module.exports = mongoose.model('Event', EventSchema);
