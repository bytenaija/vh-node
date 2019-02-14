let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    type: String
},
{
    timestamps: {createdAt: 'created_at'}
});

EventSchema.virtual('actor', {
  ref: 'Actor',
  localField: 'id',
  foreignField: 'events'
});

EventSchema.virtual('repo', {
  ref: 'Repo',
  localField: 'id',
  foreignField: 'events'
});
