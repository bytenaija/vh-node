let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    type: String,
    actor: {type: mongoose.SchemaTypes.ObjectId, ref: 'Actor'},
    repo: {type: mongoose.SchemaTypes.ObjectId, ref: 'Repo'},
    created_at: Date
});


 default =  mongoose.model('Event', EventSchema)
