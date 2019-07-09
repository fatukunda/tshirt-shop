const jwt = require('jsonwebtoken');

const generateAuthToken = customer => {
	const token = jwt.sign({ customer_id: customer.customer_id }, process.env.JWT_KEY, { expiresIn: '1h' });
	return token;
};

module.exports = generateAuthToken;
