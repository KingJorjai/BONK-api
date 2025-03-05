const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bonk = sequelize.define('Bonk', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	bonkee: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: 'bonkees',
			key: 'name',
		},
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
}, {
	tableName: 'bonks',
	timestamps: false,
});

module.exports = Bonk;