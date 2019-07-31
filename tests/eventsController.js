const app = require('../app')
const Pass = require('../models/pass')
const Team = require('../models/team')
const Game = require('../models/game')
const events_controller = require('../controllers/eventsController')
const chai = require('chai');
const chaiHttp = require('chai-http');
// Configure chai
chai.use(chaiHttp)
chai.should();

//root level hooks here because of Mocha's implied 
//describe block
describe('Events Controller', function(){
  let teamId = ''
  let gameId = ''
  let authenticatedUser = chai.request.agent(app)

  before(function(done){
    Team.deleteMany({}, function(err){
      if(err) done(err)
      let team = new Team({ name: 'A',
        division: 'Senior',
        gender: 'Men' })
      team.save((err, saved) => {
        if(err) done(err)
        teamId = saved.id
        done()
      })
    })
  })

  before(function(done){
    Game.deleteMany({}, function(err){
      if(err) done(err)
      let game = new Game({ title: 'Game',
        home: teamId,
        away: teamId,
        venue: 'Venue',
        team: teamId
      })
      game.save((err, saved) => {
        if(err) done(err)
        gameId = saved.id
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

  describe('#create', function(){
    it('should create a pass event', function(done){
      let req = {
        body: {
          to: 1,
          from: 2, 
          eventType: 'pass',
          game: gameId
        }
      }
      authenticatedUser
        .post('/events/create')
        .type('form')
        .send(req.body)
        .end((err, res) => {
          if(err) done(err)
          res.should.have.status(200)
          res.redirects[0].should.include(gameId)
          done()
        })
    })
  })
})
