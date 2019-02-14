const mongoose = require('mongoose');
const moment = require('moment');

let EventSchema = mongoose.Schema({
  id: String,
  type: String,
  actorId: String,
  repoId: String,
  created_at: Date
},
{
  toObject: {
    virtuals: true,
    transform: (doc, ret, options) => {
      delete ret.__v;
       ret.created_at = moment(ret.created_at).format('YYYY-MM-DD HH:mm:ss')
  },
  },
  toJSON: {
    virtuals:true,
    transform: (doc, ret, options) => {
      delete ret.__v;
      ret.created_at = moment(ret.created_at).format('YYYY-MM-DD HH:mm:ss')
    },
  }
}
  );


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
