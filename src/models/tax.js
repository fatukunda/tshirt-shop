const { Model, INTEGER, STRING, DECIMAL } = require('sequelize');
const sequelize = require('../db/db');
const Order = require('./order');

class Tax extends Model {}

Tax.init(
	{
		tax_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		tax_type: {
			allowNull: false,
			type: STRING,
		},
		tax_percentage: {
			type: DECIMAL,
			allowNull: false,
		},
	},
	{ sequelize, modelName: 'tax', timestamps: false, freezeTableName: true }
);
Tax.hasMany(Order, { as: 'tax', foreignKey: 'tax_id' });
module.exports = Tax;
