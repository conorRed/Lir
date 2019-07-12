const Pass = require('../models/pass')
const { body,validationResult } = require('express-validator');
const async = require('async')

const events = {
  pass: Pass
}

exports.event_delete_post = (req, res, next) => {
  id = req.body.passId
  events[req.body.eventType].findByIdAndDelete(id, (err, deleted) => {
      if (err) { return next(err); }
      // Success - got to books list.
      res.locals.success_msg = "deleted"
      res.redirect('/games/'+req.body.game);
  });
}

exports.event_update_post = (req, res, next) => {
  let type = req.body.eventType
  let eventModel = events[type]

  // needed ID here for some reason
  let event = new eventModel({
    to: req.body.to,
    from: req.body.from,
    area: req.body.area,
    type: req.body.type,
    outcome: req.body.outcome,
    game: req.body.game,
    _id: req.body.passId
  })

  eventModel.findByIdAndUpdate(req.body.passId,event, function(err){
    if(err){ return next(err);}
    res.locals.success_msg = "updated"
    res.redirect('/games/'+req.body.game);
  })
}

exports.event_create_post = (req, res, next) => {
  let type = req.body.eventType
  let eventModel = events[type]

  let event = new eventModel({
    to: req.body.to,
    from: req.body.from,
    area: req.body.area,
    type: req.body.type,
    outcome: req.body.outcome,
    game: req.body.game
  })

  event.save(function(err){
    if(err){ return next(err);}
    res.locals.success_msg = "confirmed"
    res.redirect('/games/'+req.body.game);
  })
}

// return value in format
// {
//    event1: [collection_results]
//    event2: [collection_results]
//    event3: [collection_results]
//    ...
// }

exports.api_event_show_get = function(req, res, next){
  this.response = {}
  Object.keys(events).forEach( async function(key){
    this.response[key] = await events[key].find({game: req.params.gameid})
  }, this)
  res.send(this.response)
}

exports.api_event_create_post = (req, res, next) => {
  let type = req.body.eventType
  let eventModel = events[type]

  let event = new eventModel({
    to: req.body.to,
    from: req.body.from,
    area: req.body.area,
    type: req.body.type,
    outcome: req.body.outcome,
    game: req.body.game
  })

  event.save(function(err, saved){
    if(err){ return next(err);}
    res.send(saved);
  })
}
