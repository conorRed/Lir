events = {};
['pass'].forEach(function(path){
  let module = require('./' + path);
  events[path] = module
})

module.exports = events
