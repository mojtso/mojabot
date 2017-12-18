const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());


app.post('/webhook', (req, res, next) => {
    res.send('Server is up!');
});