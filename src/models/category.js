const { Model, STRING, INTEGER } = require('sequelize');
const sequelize = require('../db/db');
const Product = require('./product');

class Category extends Model {}

Category.init(
	{
		category_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		department_id: {
			allowNull: false,
			type: INTEGER,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
		description: {
			allowNull: true,
			type: STRING,
		},
	},
	{ sequelize, modelName: 'category', timestamps: false, freezeTableName: true }
);
module.exports = Category;
