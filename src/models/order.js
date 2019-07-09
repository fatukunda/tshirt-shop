const { Model, DECIMAL, INTEGER, STRING, DATE, NOW } = require('sequelize');
const sequelize = require('../db/db');
const Customer = require('../models/customer');
const Shipping = require('../models/shipping');
const Tax = require('../models/tax');

class Order extends Model {}

Order.init(
	{
		order_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		total_amount: {
			allowNull: false,
			type: DECIMAL,
		},
		shipped_on: {
			type: DATE,
			allowNull: true,
		},
		created_on: {
			allowNull: false,
			type: DATE,
			defaultValue: NOW,
		},
		status: {
			type: INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		comments: {
			type: STRING,
			allowNull: true,
		},
		auth_code: {
			type: STRING,
			allowNull: true,
		},
		reference: {
			type: STRING,
			allowNull: true,
		},
	},
	{ sequelize, modelName: 'orders', timestamps: false, freezeTableName: true }
);
// Order.belongsTo(Customer, { as: 'orders', foreignKey: 'order_id' });
Customer.hasMany(Order, { as: 'orders', foreignKey: 'customer_id' });
Shipping.hasMany(Order, { as: 'orders', foreignKey: 'shipping_id' });
Order.hasOne(Shipping, { as: 'shipping', foreignKey: 'shipping_id' });
// Order.hasOne(Tax, { as: 'tax', foreignKey: 'tax_id' });

module.exports = Order;
