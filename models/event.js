let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: {type: String, required: true},
    type: {type: String, required: true},
    actor: {
})

EventSchema.virtual('actor', {
  ref: 'Actor',
  localField: 'id',
  foreignField: 'author'
});