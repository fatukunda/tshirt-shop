const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const auth = require('../middleware/auth');
const Order = require('../models/order');

const router = express.Router();

router.post('/stripe/charge', auth, async (req, res) => {
	// Charge an order

	const { order_id, stripeToken } = req.body;
	const order = await Order.findByPk(order_id);
	const amount = Math.round(order.total_amount * 100);
	try {
		const charge = await stripe.charges.create({
			amount,
			currency: 'usd',
			source: stripeToken,
			metadata: {
				order_id,
			},
		});
		res.send(charge);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/stripe/webhooks', async (req, res) => {
	// Set up stripe web hooks
	try {
		const event = req.body;
		res.send({ data: event.data.object, type: event.type });
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
