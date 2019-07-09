const { Model, STRING, INTEGER } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db/db');
const Review = require('../models/review');

class Customer extends Model {}
Customer.init(
	{
		customer_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: STRING,
		},
		email: {
			type: STRING,
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'Invalid email format',
				},
			},
			unique: {
				args: true,
				msg: 'The email already exists.',
			},
			notNull: {
				msg: 'Email is required',
			},
		},
		password: {
			type: STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Password is required',
				},
			},
		},
		address_1: {
			type: STRING,
			allowNull: false,
		},
		address_2: {
			type: STRING,
		},
		city: {
			type: STRING,
		},
		region: {
			type: STRING,
		},
		postal_code: {
			type: STRING,
		},
		country: {
			type: STRING,
		},
		shipping_region_id: {
			type: INTEGER,
		},
		day_phone: {
			type: STRING,
		},
		eve_phone: {
			type: STRING,
		},
		mob_phone: {
			type: STRING,
		},
		credit_card: {
			type: STRING,
			validate: {
				isCreditCard: {
					msg: 'Invalid credit card',
				},
			},
		},
		access_token: {
			type: STRING,
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'customer', timestamps: false, freezeTableName: true }
);

Customer.beforeSave(async (customer, options) => {
	if (customer.changed('password')) {
		customer.password = await bcrypt.hash(customer.password, 8);
	}
});

Customer.hasMany(Review, { as: 'reviews', foreignKey: 'customer_id' });

module.exports = Customer;
