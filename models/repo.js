let mongoose = require('mongoose');

let  = mongoose.Schema({
    id: String,
    name: String,
    url: String
});

module.exports = mongoose.model('Event', EventSchema);
