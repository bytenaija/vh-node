let mongoose = require('mongoose');

let ActorSchema = mongoose.Schema({
    id: String,
    login: String,
    avaturl: String
});

module.exports = mongoose.model('Actor', ActorSchema);