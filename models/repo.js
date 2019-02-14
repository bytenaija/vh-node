let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    type: String,
   
});

module.exports = mongoose.model('Event', EventSchema);
