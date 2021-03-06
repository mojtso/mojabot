import Sequelize from 'sequelize';

var env = process.env.NODE_ENV || 'development';


if(process.env.NODE_ENV === 'production') {
    console.log("...........running ", env);
    var sequelize = new Sequelize(process.env.DATABASE_URL);
}else {
    console.log("...........running ", env);
    console.log( process.env.NODE_POSTGRES_USER, process.env.NODE_POSTGRES_PASSWORD);
    var sequelize = new Sequelize('subscribers_db', 'postgres', process.env.NODE_POSTGRES_PASSWORD, {
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