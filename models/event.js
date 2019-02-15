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

    await mongoose.model('Actor').remove({
      id: this.actorId
    })


     await mongoose.model('Repo').remove({
       id: this.repoId
     })

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
