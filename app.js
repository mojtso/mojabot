const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());


app.get('/', (req, res, next) => {
    res.send('Server is up!');
});


module.exports = app;