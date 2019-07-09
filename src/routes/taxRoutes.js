const express = require('express');
const Tax = require('../models/tax');

const router = express.Router();

router.get('/tax', async (req, res) => {
	// Get all taxes
	try {
		const taxes = await Tax.findAll();
		res.send(taxes);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/tax/:tax_id', async (req, res) => {
	// Get a single tax
	try {
		const tax_id = parseInt(req.params.tax_id);
		const tax = await Tax.findByPk(tax_id);
		if (!tax) {
			return res.status(404).send({ error: 'Task not found' });
		}
		res.send(tax);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
