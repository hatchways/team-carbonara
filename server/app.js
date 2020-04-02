const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userRouter = require('./routes/user');

const { json, urlencoded } = express;

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
//Since 1.5 cookie parser not necessary for express-session
//module will directly read and write cookies
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

//session middleware
app.use(
  session({
    name: 'sid',
    secret: process.env.SESS_SECRET,
    cookie: {},
  }),
);

app.use('/api/user', userRouter);

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
  res.json({ error: err });
});

module.exports = app;
