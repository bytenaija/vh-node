let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id:,
    type: {type: String, required: true},
});

EventSchema.virtual('actor', {
  ref: 'Actor',
  localField: 'id',
  foreignField: 'events'
});
