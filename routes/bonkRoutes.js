const express = require('express');
const { Sequelize } = require('sequelize');
const { Bonkee, Bonk } = require('../models');
const router = express.Router();

// Add a bonk to the selected name if exists,
// otherwise create a new bonkee and add the bonk to 1
// and return the bonkee object
router.get('/bonk/:name', async (req, res) => {
	const { name } = req.params;
	const now = new Date();

	try {
		const [bonkee] = await Bonkee.findOrCreate({
			where: { name },
			defaults: { name },
		});

		await Bonk.create({
			bonkee: bonkee.name,
			created_at: now,
		});

		await bonkee.increment('bonks');
		await bonkee.update({ updatedAt: now });
		await bonkee.reload();

		res.status(200).json(bonkee);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Return the bonkees ordered with the specified criteria
// and limited to the specified number
router.get('/bonkees/', async (req, res) => {
	const { limit, sort_by, order } = req.query;

	// Allowed fields to order by
	const allowedFields = ['name', 'bonks', 'updated_at', 'created_at'];
	const allowedOrders = ['ASC', 'DESC'];

	try {
		// Validate `sort_by`
		const sortField = allowedFields.includes(sort_by) ? sort_by : 'created_at';

		// Validate `order`
		const sortOrder = allowedOrders.includes(order?.toUpperCase()) ? order.toUpperCase() : 'ASC';

		// Validate `limit`
		const parsedLimit = limit && !isNaN(parseInt(limit, 10)) ? parseInt(limit, 10) : undefined;

		const bonkees = await Bonkee.findAll({
			attributes: allowedFields,
			limit: parsedLimit,
			order: [[Sequelize.col(sortField), sortOrder]],
		});

		res.status(200).json(bonkees);
	}
	catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;