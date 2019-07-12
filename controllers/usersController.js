const bcrypt = require('bcryptjs');
const User = require('../models/user')
const { body,validationResult } = require('express-validator');
exports.user_create_post = [
  body('name', 'Please enter a name').isLength({min: 1}).trim(),
  body('email', 'Please enter valid email').isEmail(),
  body('emailExist').custom((value) => {
    return User.findOne({ email: email }).then(user => {
      if(user){ return Promise.reject('E-mail already exists') }
    });
  }),
  body('team', 'Please enter a team name').isLength({min: 1}).trim(),
  body('password', 'Please enter a password').isLength({min: 1}).trim(),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors)
    if(!errors.isEmpty()){
      res.render('admin/dashboard', {errors: errors.array()})
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      team: req.body.team,
      isAdmin: req.body.isAdmin
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.save().then(user => {
            req.flash('success_msg', 'User created');
            res.redirect('/admin/dashboard');
          })
          .catch(err => console.log(err));
      });
    });
  }
]
