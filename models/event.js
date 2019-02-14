let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    type: {type: String, required: true},
});

EventSchema.virtual('actor', {
  ref: 'Actor',
  localField: 'id',
  foreignField: 'events'
});
