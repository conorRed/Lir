module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = {
        name: req.user.name, 
        id: req.user.id ,
        isAdmin: req.user.isAdmin,
        team: req.user.team
      }
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  verifyAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      res.locals.user = {
        name: req.user.name, 
        id: req.user.id ,
        isAdmin: req.user.isAdmin,
        team: req.user.team
      }
      return next();
    }else{
      req.flash('error_msg', 'You are not admin');
      res.redirect('/dashboard');
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/teams/'+req.user.team);
  }
};
