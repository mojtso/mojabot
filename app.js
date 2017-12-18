const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routesWebHooks = require('./api/webhooks');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res, next) => {
    res.send('<h3>MojaBot is up!</h3>');
});

//Routes handling request
app.use('/webhook', routesWebHooks);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.statis = 400;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;