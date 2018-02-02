import Sequelize from 'sequelize';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';


if(env === 'development') {
    console.log("...........running development");
    var sequelize = new Sequelize('subscribers_db', 'postgres','MyNewPass', {
        dialect: 'postgres',
        define: {
            underscored: true
        }
    });
}else {
    console.log("...........running production");
    var sequelize = new Sequelize(process.env.PROD_DB_NAME, process.env.PROD_DB_USERNAME, process.env.PROD_DB_PASSWORD, {
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