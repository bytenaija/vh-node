let mongoose = require('mongoose');

let RepoSc = mongoose.Schema({
    id: String,
    name: String,
    url: String
});

module.exports = mongoose.model('Event', EventSchema);
