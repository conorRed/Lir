const app = require('../app')
const mongoose = require('mongoose')
const Team = require('../models/team')
const User = require('../models/user')
const sinon = require('sinon')

afterEach(function(){
  sinon.restore()
})

after(async function() {
  await Team.deleteMany({})
  await User.deleteMany({})
  await mongoose.disconnect()
  await app.stop()
})
