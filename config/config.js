
// const DATABASE_URI = process.env.DATABASE_URL || 'jsut';

// const SERVER_PORT = process.env.PORT  || 3000;

// const CONFIG = {
//     DATABASE_URI
// };

// module.exports = CONFIG;

module.exports = {
    development: {
        username: 'root',
        password: null,
        database: 'database_development',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        dialect: 'mysql'
    }
};