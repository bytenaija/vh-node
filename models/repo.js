const mongoose = require('mongoose');

const RepoSchema = mongoose.Schema({
  id: Number,
  name: String,
  url: String,
   events: [{
     type: String
   }],
});


RepoSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj._id;

  return obj;
}


module.exports = mongoose.model('Repo', RepoSchema);
