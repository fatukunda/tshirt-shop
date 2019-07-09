const express = require('express');
const ShippingRegion = require('../models/shippingRegion');
const Shipping = require('../models/shipping');

const router = express.Router();

router.get('/shipping/regions', async (req, res) => {
	// Get all shipping regions
	try {
		const regions = await ShippingRegion.findAll();
		res.send(regions);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/shipping/:shipping_id', async (req, res) => {
	// Get shipping given the id
	const shipping_id = parseInt(req.params.shipping_id);
	try {
		const shipping = await Shipping.findByPk(shipping_id);
		res.send(shipping);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
