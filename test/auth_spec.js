const assert = require('assert')
const User = require('../models/user')
const app = require('../app')
const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('User is logged in', function(){
  let regularUser;

  before(function(){
    regularUser = {
      name: 'John Doe', 
      email: 'john@gmail.com', 
      password: 'johndoe',
      isAdmin: false
    }
  })


  describe('GET /dashboard', function(){
    it('should show the users dashboard', function(){
       chai.request(app)
           .get('/dashboard')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               done();
            });
    })
  })
})
