const { Sequelize } = require('sequelize');
const process = require('process');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/' + process.env.db_file,
    logging: false,
});


// // MYSQL
// const db = new Sequelize({
//     dialect: 'mysql',
//     database: process.env.MYSQL_DB,
//     username: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     logging: false,
// });

// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// // Sequelize instance
// const db = new Sequelize({
//     dialect: 'postgres',
//     database: PGDATABASE,
//     username: PGUSER,
//     password: PGPASSWORD,
//     host: PGHOST,
//     port: 5432,
//     ssl: 'require',
//     clientMinMessages: 'notice',
//     connection: {
//         options: `project=${ENDPOINT_ID}`,
//         sslmode: 'require',
//     },
//     sslrootcert: '../cert/server.crt',
//     logging: false, // Optional: Disable logging; default is console.log
// });

module.exports = db;
