const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bonkee = sequelize.define('Bonkee', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	bonks: {
		type: DataTypes.INTEGER.UNSIGNED,
		defaultValue: 0,
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	updated_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
}, {
	tableName: 'bonkees',
	timestamps: false,
});

module.exports = Bonkee;