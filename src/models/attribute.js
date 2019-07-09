const { Model, INTEGER, STRING } = require('sequelize');
const sequelize = require('../db/db');
const AttributeValue = require('./attributeValue');

class Attribute extends Model {}

Attribute.init(
	{
		attribute_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			allowNull: false,
			type: STRING,
		},
	},
	{ sequelize, modelName: 'attribute', timestamps: false, freezeTableName: true }
);

Attribute.hasMany(AttributeValue, { as: 'attribute_value', foreignKey: 'attribute_id' });

module.exports = Attribute;
