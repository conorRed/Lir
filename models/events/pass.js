//Require Mongoose
//Do I need to do this everywhere?
let mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

let PassSchema = new Schema({
  to: {type: Number, required: true, min: 1, max: 30},
  from: {type: Number, required: true, min: 1, max: 30},
  type: {type: String, required: true, enum: ['Foot', 'Hand'], default: 'Foot'},
  area: {type: String, required: true, enum: ['Back', 'Mid', 'Forward'], default: 'Mid'},
  details: {type: String, required: false},
  outcome: {type: String, required: true, enum: ['Lateral', 'Forward', 'Back', 'Turnover', 'Score', 'Other'], default: 'Lateral'},
  game: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'game'
  }]
});

module.exports = mongoose.model("Pass", PassSchema, 'pass');
