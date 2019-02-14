let mongoose = require('mongoose');

let ActorSchema = mongoose.Schema({
    id: String,
    name: String,
    url: String
});

module.exports = mongoose.model('Actor', Schema);