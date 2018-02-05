import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';

//Import routes from routes folder
import subscriberRoutes from './api/routes/subscriptions';
import userRoutes from './api/routes/user';
import fileRoutes from './api/routes/files';

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin X-Requested-With, Content-Type, Accept, Authorization');
    
    if(req.header === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        return res.status(200).json({});
    }

    next();
});


app.get('/', (req, res) => {
    res.send('<h3>MojaBot is up!</h3>');
});

//Routes handling request
app.use('/subscribe', subscriberRoutes);
app.use('/user', userRoutes);
app.use('/file', fileRoutes);


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