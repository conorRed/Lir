const Team = require('../models/team')
const Game = require('../models/game')
const { body,validationResult } = require('express-validator');
const async = require('async')

exports.team_show_get = (req, res, next) => {
  async.parallel({
    team: function(callback){
      Team.findById(req.params.id).exec(callback)
    },
    games: function(callback){
      Game.find({team: req.params.id}).exec(callback)
    }
  }, function(err, results){
    if(err){return next(err)}
    res.render('team/dashboard', 
      {team: results.team, games: results.games})
  })
}

exports.team_create_post = [
  body('name', 'Name not be empty').isLength({min: 1}).trim(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      res.render('admin/dashboard', {errors: errors.array()})
    }

    let team = new Team({
      name: req.body.name,
      division: req.body.division,
      gender: req.body.gender
    })

    team.save(function(err, saved){
      if(err){ return next(err)}
      res.render('admin/dasboard', {'success_banner': 'Team created'})
    })
  }
]

exports.team_index_get = (req, res, next) => {
  Team.find({})
    .then((teams) => {
      res.locals.teams = teams
      next()
    })
    .catch((err) => {
      if(err){return next(err)}
    })
}
