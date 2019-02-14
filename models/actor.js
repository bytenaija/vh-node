let mongoose = require('mongoose');

let Schema = mongoose.Schema({
    id: String,
    name: String,
    url: String
});

module.exports = mongoose.model('Repo', RepoSchema);