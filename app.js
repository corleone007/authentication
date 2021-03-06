var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport=require('passport');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
//var sParams={secret:'loudekebal',resave:false,saveUninitialized:true,cookie:{}};
//Setting up client-sessions
var session = require('client-sessions');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting up connection to mongodb
var config=require('./config/config');
var mongoose = require('mongoose'),
    assert = require('assert');
mongoose.connect(config.dburl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(app.get('env')=='production')
{
	app.set('trust proxy',1);
	sParams.cookie.secure=true;
}
app.use(session({
  cookieName: 'session',
  secret: 'mcc_proj_abhi,shama and yadu',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  ephemeral: true,
  store:new MongoStore({
	  url:config.dburl,
	  collection:'sessions'
  })
}));
//app.use(session(sParams));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
