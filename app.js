// requires
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import Mongoose
var mongoose = require('mongoose');
var config = require('./config/globals');
var hbs = require('hbs');

// Import Passport and Express Session
var passport = require('passport');
var session = require('express-session');
var User = require('./models/user');

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session & Passport is configured before route declaration
app.use(session({
  secret: 'Eunjin_Ha_Project2',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure local strategy > username/password
passport.use(User.createStrategy()); // createStrategy() method comes from PLM
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/projects', projectsRouter);

// check db connected 
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((message) => console.log('Connected successfully!')) // connection was successfull
  .catch((error) => console.log(error)); // connection failed

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Add HBS helper methods for formatting dates and selecting values from dropdowns
hbs.registerHelper('selectOption', (currentValue, selectedValue)=>{
  // initialize selected property
  var selectedProperty = '';
  // if values are equal, set the selected property
  console.log('currentValue ' + currentValue);
  console.log('selectedValue ' + selectedValue);
  if (currentValue == selectedValue) {
    selectedProperty ='selected';
    //console.log('selected ' + currentValue);
  }
  // generate html code for the option element with the selected property
  var option = '<option ' + selectedProperty + '>' + currentValue + '</option>';
  //console.log(option);
  return new hbs.SafeString(option); // <option>VALUE</option>
});

// for date setting
hbs.registerHelper('toShortDate', (longDateValue)=>{
  return new hbs.SafeString(longDateValue.toLocaleDateString('en-CA'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;