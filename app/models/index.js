import Sequelize from 'sequelize';

var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.js')[env];
import config from '../config/config';


if(config.use_env_variable) {
    console.log("...........running prod");
    var sequelize = new Sequelize(process.env[config.use_env_variable], config);
}else {
    console.log("...........running dev");
    var sequelize = new Sequelize('subscribers_db', process.env.NODE_POSTGRES_USER, process.env.NODE_POSTGRES_PASSWORD, {
        dialect: 'postgres',
        define: {
            underscored: true
        }
    });
}

const models = {
    User: sequelize.import('./user'),
    Subscriber: sequelize.import('./subscriber'),
    File: sequelize.import('./file'),
};

Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;