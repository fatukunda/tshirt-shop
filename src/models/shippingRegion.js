const { Model, INTEGER, STRING } = require('sequelize');
const sequelize = require('../db/db');
const Shipping = require('./shipping');

class ShippingRegion extends Model {}

ShippingRegion.init(
	{
		shipping_region_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		shipping_region: {
			allowNull: false,
			type: STRING,
		},
	},
	{ sequelize, modelName: 'shipping_region', timestamps: false, freezeTableName: true }
);

ShippingRegion.hasMany(Shipping, { as: 'shipping', foreignKey: 'shipping_region_id' });

module.exports = ShippingRegion;
