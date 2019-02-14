let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    name: String,
    url: St
   
});

module.exports = mongoose.model('Event', EventSchema);
