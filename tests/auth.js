const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../models/user')
const {app, server} = require('../app')
const chai = require('chai');
const request = require('supertest')

// Configure chai
chai.should();

describe('Authentication', function(){
  before((done) => {
    User.deleteMany({}, function(err){
      if(err){throw err}
      done()
    })
  })

  describe('Logged in (not admin)', function(){
    let regularUser;
    var authenticatedUser = request.agent('http://localhost:5000')
    before(function(done){
      regularUser = {
        id: 1,
        name: 'John Doe', 
        email: 'john@gmail.com', 
        password: 'root',
        isAdmin: false,
        team: 'A'
      }
      let user = new User(regularUser)
      user.save((err) => {
        if(err){throw err}
        done()
      })
    })

    it('should log user in', function(done){
      authenticatedUser
          .post('/users/login')
          .type('form')
          .send({
            email: regularUser.email,
            password: regularUser.password
          })
          .expect(302)
          .expect('Location', '/dashboard')
          .end((err, res) => {
            if(err){throw err}
            done()
          })
    })

    it('should show the users dashboard', function(done){
      authenticatedUser
         .get('/dashboard')
         .expect(200)
         .end((err, res) => {
           if(err){throw err}
           done()
        });
    })
  })

  describe('Not Logged in', function(){
    it('should not show the users dashboard', function(done){
       request(app)
           .get('/dashboard')
           .expect(302)
           .expect('Location', '/users/login')
           .end((err, res) => {
             if(err){throw err}
             done()
          });
    })
  })

  after(function() {
    mongoose.disconnect()
    server.close()
  })
})
