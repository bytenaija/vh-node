let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({
    id: String,
    type: String,
    actor: {type: SchemaTypes
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});


