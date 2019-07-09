const { Model, DECIMAL, INTEGER, STRING } = require('sequelize');
const sequelize = require('../db/db');
const Order = require('./order');

class Shipping extends Model {}

Shipping.init(
	{
		shipping_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		shipping_type: {
			allowNull: false,
			type: STRING,
		},
		shipping_cost: {
			allowNull: false,
			type: DECIMAL,
		},
	},
	{ sequelize, modelName: 'shipping', timestamps: false, freezeTableName: true }
);

module.exports = Shipping;
