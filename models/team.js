let mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

let TeamSchema = new Schema({
  name: {type: String, required: true},
  division: {type: String, enum: ['Senior', 'Intermediate'], required: true},
  gender: {type: String, enum: ['Men', 'Ladies'], required: true}
});

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team
