import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';
import exphbs from 'express-hbs';
import path from 'path';

//Import routes from routes folder
import subscriberRoutes from './app/routes/api/subscriptions';
import userRoutes from './app/routes/api/user';
import fileRoutes from './app/routes/api/files';

const pagesRoutes = {
    pages: require('./app/routes/pages').router
};

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


app.engine('hbr', exphbs.express4({
    partialsDir: path.join(__dirname, './src/views/partials'),
    layoutsDir: path.join(__dirname, './src/views/layouts'),
    defaultLayout: 'view/layouts/index.hbr'
}));

app.get('/', (req, res) => {
    res.send('<h3>MojaBot is up!</h3>');
});

//Routes handling request
app.use('api/subscribe', subscriberRoutes);
app.use('api/user', userRoutes);
app.use('api/file', fileRoutes);
app.use('/', express.static(path.join(__dirname, './src/lib'))); 


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