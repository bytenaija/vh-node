let mongoose = require('mongoose');

let ActorSchema = mongoose.Schema({
    id: String,
    login: String,
    avatar_urlurl: String
});

module.exports = mongoose.model('Actor', ActorSchema);