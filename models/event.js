let mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

let EventSchema = new Schema({
  type: {type: String, required: true, default: 'Pass'},
});

module.exports = mongoose.model("Event", EventScema);
