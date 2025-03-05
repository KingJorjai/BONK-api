const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

// Sync the database and start the server
sequelize.sync({ force: process.env.npm_lifecycle_event === 'dev' })
	.then(() => {
		console.log('Database synced');
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Unable to sync database:', error);
	});