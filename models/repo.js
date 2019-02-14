let mongoose = require('mongoose');

    id: String,
    name: String,
    url: String
});

module.exports = mongoose.model('Event', EventSchema);
