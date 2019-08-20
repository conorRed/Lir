const sinon = require('sinon')
const app = require('../../app')
const Pass = require('../../models/events/pass')
const Team = require('../../models/team')
const Game = require('../../models/game')
var ObjectId = require('mongoose').Types.ObjectId;
const events_controller = require('../../controllers/eventsController')
const chai = require('chai');
const chaiHttp = require('chai-http');
// Configure chai
chai.use(chaiHttp)
chai.should();

//root level hooks here because of Mocha's implied 
//describe block
describe('Events Controller', function(){
  let authenticatedUser = chai.request.agent(app)

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

  var id = require('mongoose').Types.ObjectId;
  let req = { 
    body: { // for testing create vehicle
      to: 1,
      from: 2, 
      eventType: 'pass',
      game: id(),
      id: id()
    },
    params: {
      gameid: ''
    }
  },
  // server error
  res = {}, 
  expectedResult;

  let next = sinon.stub()
  beforeEach(function () {
    req.flash = sinon.spy()
    res = {
      json: sinon.spy(),
      redirect: sinon.spy()
    };
  });

  describe('#create', function(){
    it('should create pass event', function () {
      expectedResult = req.body
      let pass = Pass
      sinon.stub(pass, 'create').yields(null, expectedResult)
      events_controller.event_create_post(req, res);
      sinon.assert.calledOnce(pass.create)
      sinon.assert.calledWith(res.redirect, '/games/'+req.body.game)
      sinon.assert.calledOnce(req.flash)
      sinon.assert.calledWith(req.flash, 'success_msg', 'Event Created')
    });
  })
  describe('#update', function(){
    it('should update pass event', function () {
      req.body.from = 6
      req.body.eventId = req.body.id
      sinon.stub(Pass, 'findByIdAndUpdate').yields(null, expectedResult)
      events_controller.event_update_post(req, res);
      sinon.assert.calledOnce(Pass.findByIdAndUpdate);
      sinon.assert.calledWith(Pass.findByIdAndUpdate, req.body.eventId);
      sinon.assert.calledWith(res.redirect, '/games/'+req.body.game)
      sinon.assert.calledWith(req.flash, 'success_msg', 'Event Updated')
    });

    it('should return event type not set', function () {
      req.body.eventType = 'another'
      let expectedError = new Error('Event type not set')
      sinon.stub(Pass, 'findByIdAndUpdate')
      events_controller.event_update_post(req, res, next);
      req.body.eventType ='pass'
      sinon.assert.notCalled(Pass.findByIdAndUpdate);
      sinon.assert.called(next)
    });
  })
  describe('#delete', function(){
    it('should delete pass event', function () {
      req.body.eventId = req.body.id
      sinon.stub(Pass, 'findByIdAndDelete').yields(null, expectedResult)
      events_controller.event_delete_post(req, res);
      sinon.assert.calledOnce(Pass.findByIdAndDelete);
      sinon.assert.calledWith(Pass.findByIdAndDelete, req.body.eventId);
      sinon.assert.calledWith(res.redirect, '/games/'+req.body.game)
      sinon.assert.calledWith(req.flash, 'success_msg', 'Event Deleted')
    });
  })
  describe('api#show', function(){
    let expectedResult = {'pass': []}
    it('should return all events for game', async function () {
      sinon.stub(Pass, 'find').yields(null).resolves([])
      await events_controller.api_event_show_get(req, res);
      sinon.assert.calledOnce(Pass.find)
      sinon.assert.calledWith(res.json, expectedResult)
    });
  })
})
