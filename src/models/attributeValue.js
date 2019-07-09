const { Model, INTEGER, STRING } = require('sequelize');
const sequelize = require('../db/db');

class AttributeValue extends Model {}

AttributeValue.init(
	{
		attribute_value_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		value: {
			allowNull: false,
			type: STRING,
		},
	},
	{ sequelize, modelName: 'attribute_value', timestamps: false, freezeTableName: true }
);

module.exports = AttributeValue;
