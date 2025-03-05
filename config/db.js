const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bonk_db', 'root', 'password', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;