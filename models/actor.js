let mongoose = require('mongoose');

let ActorSchema = mongoose.Schema({
    id: String,
    : String,
    url: String
});

module.exports = mongoose.model('Actor', ActorSchema);