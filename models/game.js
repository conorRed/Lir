let mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

let GameSchema = new Schema({
  title: {type: String, required: true},
  home: {type: Schema.Types.ObjectId, ref: 'Team'},
  away : {type: Schema.Types.ObjectId, ref: 'Team'},
  venue: {type: String, required: true},
  team: {type: Schema.Types.ObjectId, ref: 'Team'}
});

module.exports = mongoose.model("game", GameSchema);
