let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    type: 
});

EventSchema.virtual('actor', {
  ref: 'Actor',
  localField: 'id',
  foreignField: 'events'
});
