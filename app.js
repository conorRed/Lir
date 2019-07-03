const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');


const app = express();
require('./config/passport')(passport);
require('./config/database.js')
app.use(express.static('public'))

app.use(expressLayouts);
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}));

// session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// rather than using req.flash(...) in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))
const PORT = process.env.PORT || 5000;



app.listen(PORT, console.log(`Server started on port ${PORT}`));
