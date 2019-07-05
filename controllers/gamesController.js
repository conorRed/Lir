const Game = require('../models/game')
const { body,validationResult } = require('express-validator');

exports.index = (req, res) => {
  console.log(req)
  Game.find({}, 'title home away venue _id')
    .exec(function (err, list_games) {
      if (err) { return next(err); }
      res.render('games', { title: 'Your Games', games:  list_games});
    });
}

exports.game_show_get = (req, res) => {
  Game.findById(req.params.id, 'title home away venue _id')
    .exec(function (err, game) {
      if (err) { return next(err); }
      res.render('game/show', {game: game})
    });
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

    console.log(errors)
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
