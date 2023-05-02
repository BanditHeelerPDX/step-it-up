const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

sequelize.authenticate().then(() => {
    console.log('Steppin\' in the right direction.');
}).catch((err) => {
    console.error('Steppin\' in the wrong direction:', err);
});

module.exports = sequelize;