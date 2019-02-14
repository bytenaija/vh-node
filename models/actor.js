let mongoose = require('mongoose');

let ActorSchema = mongoose.Schema({
    id: Number,
    login: String,
    avatar_url: String,
     event: String,
});

module.exports = mongoose.model('Actor', ActorSchema);
