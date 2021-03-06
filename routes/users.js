const express = require('express');
const router = express.Router();
const { verifyAdmin, forwardAuthenticated } = require('../config/auth');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const user_controller = require('../controllers/usersController')


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/create', verifyAdmin, user_controller.user_create_post)
router.post('/update/:id', verifyAdmin, user_controller.user_update_put)

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){throw err}
    if(!user){
      req.flash('error_msg', info.message);
      res.redirect('/users/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/teams/'+user.team);
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
