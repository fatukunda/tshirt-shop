const uuid = require('uuid/v4');

const generateUniqueId = () => {
	return uuid();
};

module.exports = generateUniqueId;
