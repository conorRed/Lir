const Game = require('../models/game')

exports.display_games = (req, res) => {
  console.log(req)
  Game.find({}, 'title home away venue _id')
    .exec(function (err, list_games) {
      if (err) { return next(err); }
      res.render('games', { title: 'Your Games', games:  list_games});
    });
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
