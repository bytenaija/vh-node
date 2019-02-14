let mongoose = require('mongoose');

let EventSchema = mongoose.Schema({

    type: String
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});


