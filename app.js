var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var passport = require('passport');
var config = require('./config/main');
var schedule = require('node-schedule');
// var authModel = require('./models/authModel'); // Can be moved to a proper location
var jwt = require('jsonwebtoken');
var cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var sold = require('./routes/sold');
var instantOpp = require('./routes/instantOpperation');
var scheduledOpp = require('./routes/scheduledOpperation');
var messaging = require('./routes/messaging');
var updateInstantOppSvc = require('./services/updateInstantOppSvc');

// mongodb connection
var db;
var db_connection = require('./config/db_connection');
// var dbconnection = 'mongodb://localhost/bankApp';
var dbconnection = 'mongodb://bankapp:bankapp@ds113906.mlab.com:13906/bankapp';
var app = express();

app.use(cors());

MongoClient.connect(dbconnection, (err, database) => {
    if (err)
        return console.log(err);
    db = database;
});

function databaseStore(message) {
    let storeData = {chatMessage: message, timestamp: new Date().toLocaleString()};
    db.collection('messaging').save(storeData, (err, result) => {
        if (err)
            return console.log(err);
    });
}

schedule.scheduleJob('1 * * * * *', function () {
    let req, res, next;
    new updateInstantOppSvc().getAllOpperations(req, res, next);
});

// Connecting to socket service
var server = app.listen(4000);
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {

    // When a user is typing a message !
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

    // When a chat message is sent !
    socket.on('messaging', function (data) {
        io.sockets.emit('messaging', data);
    });

    // When a user disconnect !
    socket.on('disconnect', function () { });

    socket.on('add-message', function (message) {
        io.emit('message', {type: 'new-message', text: message});
        databaseStore(message);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialise passport (Passport middleware)
app.use(passport.initialize());
app.use(passport.session());

// Bringing passport strategie
require('./config/passport')(passport);

app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/sold', sold);
app.use('/instant_opp', instantOpp);
app.use('/scheduled_opp', scheduledOpp);
app.use('/messaging', messaging);

// Custom Exceptions Handling
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send({
        type: err.name,
        message: err.message
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.status(err.status || 500).send({
        errorStatus: err.status || 500,
        type: err.name,
        message: err.message
    });
});

module.exports = app;
