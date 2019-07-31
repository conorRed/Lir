const Game = require('../models/game')
const Team = require('../models/team')
const app = require('../app')
const chai = require('chai');
const chaiHttp = require('chai-http');
// Configure chai
chai.use(chaiHttp)
chai.should();

//root level hooks here because of Mocha's implied 
//describe block
describe('Games Controller', function(){
  let teamId = ''
  let gameId = ''
  let authenticatedUser = chai.request.agent(app)

  before(function(done){
    Team.deleteMany({}, function(err){
      if(err) done(err)
      let team = new Team({ name: 'A', division: 'Senior',
        gender: 'Men' })
      team.save((err, saved) => {
        if(err) done(err)
        teamId = saved.id
        done()
      })
    })
  })

  before(function(done){
    authenticatedUser
      .post('/users/login')
      .type('form')
      .send({email:'john@gmail.com', password:'root'})
      .end(function(err, res){
        if(err) done(err);
        else done()
      })
  })

  before(function(done){
    Game.deleteMany({}, done)
  })

  describe('#create', function(){
    it('should create a game', function(done){
      let req = {
        body: {
          title: 'Game',
          home: teamId, 
          away: teamId, 
          venue: 'Venue', 
          team: teamId
        }
      }
      authenticatedUser
        .post('/games/create')
        .type('form')
        .send(req.body)
        .end((err, res) => {
          if(err) done(err)
          res.should.have.status(200)
          res.text.should.include('Game Created')
          res.text.should.include(req.body.title)
          gameId = res.redirects[0].split('/')[res.redirects[0].split('/').length-1]
          done()
        })
    })
    it('should not create a game', function(done){
      let req = {
        body: {}
      }
      authenticatedUser
        .post('/games/create')
        .type('form')
        .send(req.body)
        .end((err, res) => {
          if(err) done(err)
          res.should.have.status(500)
          done()
        })
    })
  })

  describe('#show', function(){
    it('should display the game', function(done){
      authenticatedUser
        .get('/games/'+gameId)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
