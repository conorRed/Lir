const Team = require('../models/team')
const Game = require('../models/game')
const Pass = require('../models/events/pass')
const { body,validationResult } = require('express-validator');
const async = require('async')

exports.index = (req, res) => {
  Game.find({}, 'title home away venue _id')
    .exec(function (err, list_games) {
      if (err) { return next(err); }
      res.render('games', { title: 'Your Games', games:  list_games});
    });
}

exports.game_show_get = (req, res, next) => {
  async.parallel({
    game: function(callback){
      Game.findById(req.params.id)
        .populate({path:'away', select: 'name'})
        .populate({path:'home', select: 'name'})
        .populate('team')
        .exec(callback);
    },
    passes: function(callback){
      Pass.find({game: req.params.id}).exec(callback)
    }
  }, function(err, results){
    if(err){return next(err)}
    res.render('game/show', {game: results.game, passes: results.passes})
  })
}

exports.game_create_get = (req, res, next) => {
  res.render('game/create')
}

exports.game_create_post = (req, res, next) => {
  let game = new Game({
    title: req.body.title,
    home: req.body.home,
    away: req.body.away,
    venue: req.body.venue,
    team: req.body.teamId
  })

  game.save(function(err, saved){
    if(err){ return next(new Error("Game not created"))}
    req.flash('success_msg', "Game Created")
    res.redirect('/games/'+saved.id)
  })
}

exports.list_games = (req, res, next) => {
  let user = req.user
  Game.find({}, 'title home away venue _id')
    .exec(function (err, list_games) {
      if (err) { return next(err); }
      req.games = list_games
      next();
    });
}
