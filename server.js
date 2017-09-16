const express = require('express');
const bodyparser = require('body-parser');

const app = express();

const contactApi = require('./api/contact.api');
const userApi = require('./api/user.api');
const dbLogger = require('./middleware/dblogger');
var MongoClient = require('mongodb').MongoClient;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'token ,Origin , X-Requested-With,Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});

MongoClient.connect('mongodb://localhost:27017/Contact', function (err, db) {
    app.use(dbLogger);
    contactApi(app, db);
    userApi(app, db);
});

app.listen(3000, function () {
    console.log('Listening on port 3000!')
});