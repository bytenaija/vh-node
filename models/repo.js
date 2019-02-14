let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    name: String,
    url: Sting,
   
});

module.exports = mongoose.model('Event', EventSchema);
