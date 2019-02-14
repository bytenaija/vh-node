let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    name: String,
    url
   
});

module.exports = mongoose.model('Event', EventSchema);
