import http from 'http';
import app from './app';
import models from './api/models';


const port = process.env.PORT || 3000;
const server = http.createServer(app);

models.sequelize.sync({ }).then((results) => {
    server.listen(port);
});