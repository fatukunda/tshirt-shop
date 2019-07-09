const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');

const auth = async (req, res, next) => {
	try {
		const token = req.header('USER_KEY').replace('Bearer ', '');
		const data = jwt.verify(token, process.env.JWT_KEY);
		const customer = await Customer.findOne({
			where: {
				customer_id: data.customer_id,
			},
		});
		if (!customer) {
			return res.status(401).send({
				status: 401,
				code: 'AUT_02',
				message: 'Access Unauthorized',
			});
		}
		req.customer = customer;
		req.token = token;
		next();
	} catch (error) {
		res.status(400).send(error);
	}
};

module.exports = auth;
