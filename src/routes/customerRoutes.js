const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Customer = require('../models/customer');
const generateAuthToken = require('../utils/generateAuthToken');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/customers', async (req, res) => {
	const customer = Customer.build(req.body);
	try {
		const token = generateAuthToken(customer);
		customer.access_token = token;
		await customer.save();
		return res.status(201).send({ customer, accessToken: `Bearer ${token}` });
	} catch (error) {
		res.status(400).send({ message: 'Email already exists.' });
	}
});

router.post('/customers/login', async (req, res) => {
	// Login a customer given their email and password
	const { email, password } = req.body;
	try {
		const customer = await Customer.findOne({
			where: {
				email,
			},
		});
		if (!customer) {
			return res.status(404).send({
				status: 404,
				code: 'USR_05',
				field: 'email',
				message: "The email doesn't exist.",
			});
		}
		const isPasswordMatch = await bcrypt.compare(password, customer.password);
		if (!isPasswordMatch) {
			return res.status(400).send({
				status: 400,
				code: 'USR_01',
				field: 'email',
				message: 'Email or Password is invalid.',
			});
		}
		const token = generateAuthToken(customer);
		res.send({ customer, access_token: `Bearer ${token}`, expires_in: '1h' });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/customer', auth, async (req, res) => {
	// Get  customer Info using their token
	res.send(req.customer);
});

router.patch('/customers', auth, async (req, res) => {
	// Update a customer
	const acceptedEditOptions = ['name', 'email', 'password', 'day_phone', 'eve_phone', 'mob_phone'];
	const receivedOptions = Object.keys(req.body);
	const isUpdateOption = receivedOptions.every(option => acceptedEditOptions.includes(option));
	if (!isUpdateOption) {
		return res.status(400).send({ error: 'Invalid update options' });
	}
	try {
		receivedOptions.forEach(option => (req.customer[option] = req.body[option]));
		await req.customer.save();
		res.send(req.customer);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/customers/address', auth, async (req, res) => {
	// Update customer address
	const acceptedEditOptions = [
		'address_1',
		'address_2',
		'city',
		'region',
		'postal_code',
		'country',
		'shipping_region_id',
	];
	const receivedOptions = Object.keys(req.body);
	const isUpdateOption = receivedOptions.every(option => acceptedEditOptions.includes(option));
	if (!isUpdateOption) {
		return res.status(400).send({ error: 'Invalid update options' });
	}
	try {
		receivedOptions.forEach(option => (req.customer[option] = req.body[option]));
		await req.customer.save();
		res.send(req.customer);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/customers/creditcard', auth, async (req, res) => {
	// Update customer credit card details
	const acceptedEditOptions = ['credit_card'];
	const receivedOptions = Object.keys(req.body);
	const isUpdateOption = receivedOptions.every(option => acceptedEditOptions.includes(option));
	if (!isUpdateOption) {
		return res.status(400).send({ error: 'Invalid update options' });
	}
	try {
		receivedOptions.forEach(option => (req.customer[option] = req.body[option]));
		await req.customer.save();
		res.send(req.customer);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/customers/facebook', async (req, res) => {
	// Get customer info after log in with Facebook
	res.send(req.user);
});

router.get('/auth/facebook', passport.authenticate('facebook'), async (req, res) => {});

router.get(
	'/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/customers/facebook',
		failureRedirect: '/',
	})
);

module.exports = router;
