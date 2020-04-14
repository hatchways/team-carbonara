const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const storeOptions = require('./config/storeOptions');
const logger = require('morgan');
const userRouter = require('./routes/users');
const availabilityRouter = require('./routes/availability');

const { json, urlencoded } = express;

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(
  session({
    name: 'sess_calendapp',
    secret: process.env.SESS_SECRET,
    store: new MongoStore(storeOptions),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: false,
      secure: false,
    },
  }),
);

app.use('/api/user', userRouter);
app.use('/api/availability', availabilityRouter);

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
