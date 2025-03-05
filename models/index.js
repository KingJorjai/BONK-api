const Bonkee = require('./Bonkee');
const Bonk = require('./Bonk');

// One bonkee can have many bonks
Bonkee.hasMany(Bonk, { foreignKey: 'bonkee' });
Bonk.belongsTo(Bonkee, { foreignKey: 'bonkee' });

module.exports = {
	Bonkee,
	Bonk,
};