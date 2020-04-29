const fs = require('fs');
const http = require('http');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require ('mongoose');
const cors = require("cors");

const passport = require('./backend/passport');

// create express app
const app = express();
app.server = require('http').createServer(app);
app.use(
  cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// body parser set up
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// MongoDB setup
mongodb_url = 'mongodb://demo:demo1234@ds261648.mlab.com:61648/passport-demo';
mongoose.connect(mongodb_url, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Allow CORS so that backend and frontend could be put on different servers
// var allowCrossDomain = function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Origin");
//     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//     next();
// };
// app.use(allowCrossDomain);


// use static folder
app.use(express.static('public'));
app.use(express.static('public/vendor.bundle.js'));
app.use(express.static('public/app.bundle.js'));
app.use(express.static('public/assets'));

// app.get ('/', function (req, res) {
// 	return res.sendFile (path.resolve (__dirname, './public/index.html'));
// });


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());

require('./backend/routes')(app, router);

// Listening on a port
const port = process.env.PORT || 8081;
app.server.listen(port, '0.0.0.0', () => {
  console.log('Backend server is running on localhost:' + port + '/');
});
