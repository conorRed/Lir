const Game = require('../models/game')
const Pass = require('../models/pass')
const { body,validationResult } = require('express-validator');
const async = require('async')

exports.index = (req, res) => {
  console.log(req)
  Game.find({}, 'title home away venue _id')
    .exec(function (err, list_games) {
      if (err) { return next(err); }
      res.render('games', { title: 'Your Games', games:  list_games});
    });
}

exports.game_show_get = (req, res, next) => {
  async.parallel({
    game: function(callback){
      Game.findById(req.params.id, 'title home away venue _id') .exec(callback);
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
  res.render('./game/create')
}

exports.game_create_post = [
  body('title', 'Title not be empty').isLength({min: 1}).trim(),
  body('away', 'Away not be empty').isLength({min: 1}).trim(),
  body('home', 'Home not be empty').isLength({min: 1}).trim(),
  body('venue', 'Venue not be empty').isLength({min: 1}).trim(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      res.render('game/create', {errors: errors.array()})
    }

    let game = new Game({
      title: req.body.title,
      home: req.body.home,
      away: req.body.away,
      venue: req.body.venue,
      user: req.params.userId
    })

    game.save(function(err){
      if(err){ return next(err)}
      res.redirect('/dashboard')
    })
  }
]

exports.list_games = (req, res, next) => {
  let user = req.user
  Game.find({}, 'title home away venue _id')
    .exec(function (err, list_games) {
      if (err) { return next(err); }
      req.games = list_games
      next();
    });
}
