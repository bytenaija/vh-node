const mongoose = require('mongoose');

const RepoSchema = mongoose.Schema({
  id: String,
  name: String,
  url: String,
},
{
  _id: false,
  __v: false,
  toJSON: {
    transform: function (doc, ret) {

      delete ret._id;
    }
  },
  toObject: {
    transform: function (doc, ret) {

      delete ret._id;
    }
  },
}
  );


RepoSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj._id;

  return obj;
}


module.exports = mongoose.model('Repo', RepoSchema);
