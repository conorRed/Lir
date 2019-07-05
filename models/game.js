let mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

let GameSchema = new Schema({
  title: {type: String, required: true},
  home: {type: String, required: true},
  away: {type: String, required: true},
  venue: {type: String, required: true},
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

module.exports = mongoose.model("game", GameSchema);
