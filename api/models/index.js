import Sequelize from 'sequelize';
import config from '../../config/config';

var sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    define: {
        underscored: true
    }
});

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