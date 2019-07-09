const express = require('express');
const Category = require('../models/category');

const router = express.Router();

router.get('/categories', async (req, res) => {
	try {
		const categories = await Category.findAll();
		res.send(categories);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
