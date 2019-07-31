const assert = require('assert')
const User = require('../models/user')
const Team = require('../models/team')
const app = require('../app')
const chai = require('chai');
const request = require('supertest')

// Configure chai
chai.should();


describe('Authentication', function(){
  var teamId = ''
  before(function(done){
    Team.deleteMany({}, function(err){
      if(err){throw err}
      defaultTeam = {
        name: 'A',
        division: 'Senior',
        gender: 'Men'
      }
      let team = new Team(defaultTeam)
      team.save((err, saved) => {
        if(err) done(err)
        teamId = saved.id
        done()
      })
    })
  })
  before((done) => {
    User.deleteMany({}, function(err){
      if(err){throw err}
      done()
    })
  })

  describe('Logged in (not admin)', function(){
    let user;
    var authenticatedUser = request.agent('http://localhost:5000')
    before(function(done){
      user = new User( {
        id: 1,
        name: 'John Doe', 
        email: 'john@gmail.com', 
        password: 'root',
        isAdmin: false,
        team: teamId
      })
      user.save(done)
    })

    it('should log user in', function(done){
      authenticatedUser
          .post('/users/login')
          .type('form')
          .send({
            email: user.email,
            password: 'root'
          })
          .expect(302)
          .expect('Location', '/teams/'+user.team)
          .end(done)
    })

    it('should show the users dashboard', function(done){
      authenticatedUser
         .get('/teams/'+user.team)
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
           .get('/teams/'+teamId)
           .expect(302)
           .expect('Location', '/users/login')
           .end((err, res) => {
             if(err){throw err}
             done()
          });
    })
  })
})

