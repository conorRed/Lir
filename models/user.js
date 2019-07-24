const mongoose = require('mongoose');
const bcrypt= require('bcryptjs')
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  isAdmin: {
      type: Boolean,
      default: false
  }
});

UserSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {next(err);}
        this.password = hash;
        return next();
      });
    });
})
const User = mongoose.model('User', UserSchema);

module.exports = User;
