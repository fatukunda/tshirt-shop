const express = require('express');
const Order = require('../models/order');
const auth = require('../middleware/auth');
const ShoppingCart = require('../models/shoppingCart');
const Customer = require('../models/customer');
const { getCartProducts } = require('../controllers/shoppingCartController');

const router = express.Router();
router.post('/orders', auth, async (req, res) => {
	// Create an order
	try {
		const { shipping_id, total_amount } = req.body;
		const order = Order.build({
			total_amount,
			customer_id: req.customer.customer_id,
			shipping_id,
		});
		await order.save();
		res.status(201).send({ order_id: order.order_id });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/orders/incustomer', auth, async (req, res) => {
	// Get orders of a given customer.
	const customer = req.customer;
	try {
		const orders = await customer.getOrders();
		res.send(orders);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/orders/:order_id', auth, async (req, res) => {
	// View order details
	try {
		const order_id = parseInt(req.params.order_id);
		const order = await Order.findByPk(order_id);
		if (!order) {
			return res.status(404).send({ error: 'Order not found' });
		}
		res.send(order);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
