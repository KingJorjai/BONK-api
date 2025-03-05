const express = require('express');
const bonkRoutes = require('./routes/bonkRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Usar las rutas de bonk
app.use('/api', bonkRoutes);

// Manejo de errores
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;