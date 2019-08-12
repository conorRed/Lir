const events = require('../models/events/')
const { validationResult } = require('express-validator');

function _constructDoc(body){
  let type = body.eventType
  let eventModel = events[type]
  let eventAttributes = Object.keys(eventModel.schema.paths)
  let queryKeys = Object.keys(body)

  let doc = {};
  for( let index in eventAttributes){
    let attr = eventAttributes[index]
    if(body[attr] == undefined){ continue;}
    if(attr == '__v' ){continue;}
    doc[attr] = body[attr]
  }
  let model = new eventModel(doc)
  return model
}

exports.event_delete_post = (req, res, next) => {
  if(!(req.body.eventType in events)) return next(new Error('Event type not set'))
  id = req.body.eventId
  events[req.body.eventType].findByIdAndDelete(id, (err, deleted) => {
      if (err) { return next(new Error("Could not delete")); }
      req.flash('success_msg', 'Event Deleted')
      res.redirect('/games/'+req.body.game);
  });
}

exports.event_update_post = (req, res, next) => {
  if(!(req.body.eventType in events)) return next(new Error('Event type not set'))
  let event = _constructDoc(req.body)

  events[req.body.eventType].findByIdAndUpdate(req.body.eventId, event, function(err){
    if(err){ return next(err);}
    req.flash('success_msg', 'Event Updated')
    res.redirect('/games/'+req.body.game);
  })
}

exports.event_create_post = (req, res, next) => {
  let event = _constructDoc(req.body)

  event.save(function(err, saved){
    if(err) return next(new Error("Could not create event"));
    req.flash('success_msg', 'Event Created')
    return res.redirect('/games/'+req.body.game);
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
  eventNames = Object.keys(events)
  var promises = {}
  for([key, value] of Object.entries(events)){
    promises[key] = events[key].find({game: req.params.gameid}, '-_id -__v', (err) => {
      if(err){return next(err)}
    })
  }
  Promise.all(Object.values(promises)).then((docs) => {
    Object.keys(promises).map((key, index) => {
      promises[key] = docs[index]
    })
    res.json(promises)
  })
  .catch((err) => {
    if(err){return next(err)}
  })
}

exports.api_event_create_post = (req, res, next) => {
  let doc = _contructDoc(req.body)
  let event = new eventModel(doc)

  event.save(function(err, saved){
    if(err){ return next(err);}
    res.send(saved);
  })
}
