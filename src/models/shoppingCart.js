const { Model, DATE, INTEGER, STRING, TINYINT, NOW } = require('sequelize');
const sequelize = require('../db/db');
const Product = require('../models/product');

class ShoppingCart extends Model {}

ShoppingCart.init(
	{
		item_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		cart_id: {
			allowNull: false,
			type: STRING,
		},
		attributes: {
			allowNull: false,
			type: STRING,
		},
		quantity: {
			allowNull: false,
			type: INTEGER,
			defaultValue: 1,
		},
		buy_now: {
			type: TINYINT,
			allowNull: false,
			defaultValue: 0,
		},
		added_on: {
			type: DATE,
			defaultValue: NOW,
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'shopping_cart', timestamps: false, freezeTableName: true }
);
module.exports = ShoppingCart;
