import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';
import exphbs from 'express-hbs';
import fp from 'path';

//Import routes from routes folder
import subscriberRoutes from './app/routes/api/subscriptions';
import userRoutes from './app/routes/api/user';
import fileRoutes from './app/routes/api/files';


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

//PAGES CONFIG
function relative(path) {
    return fp.join(__dirname, path);
}

const viewsDir = relative('views');
app.use(express.static(relative('public_static')));
app.engine('hbs', exphbs.express4({
    partialsDir: relative('views/src/partials'),
    layoutsDir: relative('views/src/layouts'),
    defaultLayout: relative('views/src/layouts/main.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', relative('views'));
//END PAGES CONFIG




//Routes handling request
const pagesRoutes = {
    pages: require('./app/routes/pages').router
};
app.use('api/subscribe', subscriberRoutes);
app.use('api/user', userRoutes);
app.use('api/file', fileRoutes);
app.use('/official', pagesRoutes.pages);



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