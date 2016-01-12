var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var bcrypt = require('bcrypt');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var knex = require('./db/knex')

var routes = require('./routes/index');
var auth = require('./routes/auth');
var trip = require('./routes/trip');

var app = express();

require('dotenv').load();
require('locus');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  knex('users').where('id', id).first().then(function(user) {
    done(err, user);
  });
});

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    knex('users').where('email', email).first().then(function(user) {
      // email does not exist, or password is invalid
      if (!user || !bcrypt.compareSync(password, user.password)){
        return done(null, false, req.flash('message', 'Invalid email/password.'));
      }

      // User and password both match, return user from
      // done method which will be treated like success
      return done(null, user);
    });
}));

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    findOrCreateUser = function(){
      knex('users').where('email', email).first().then(function(user) {
        // user already exists
        if (user) {
          return done(null, false, req.flash('message','User Already Exists. Please login.'));
        } else if (req.body.password !== req.body['confirm-password']) {
          return done(null, false, req.flash('message', 'Passwords do not match'));
        }else{
          // if there is no user with that email
          // create the user
          var hash = bcrypt.hashSync(req.body.password, 8);
          knex('users').insert({
            email: email,
            password: hash
          }, 'id').then(function(id) {
            return done(null, id[0]);
          });
        }
      });
    };

    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }
));

app.use('/', routes);
app.use('/auth', auth);
app.use('/trip', trip);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      title: "Error",
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    title: "Error",
    message: err.message,
    error: {}
  });
});


module.exports = app;
