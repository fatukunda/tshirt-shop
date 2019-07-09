const { Model, STRING, INTEGER } = require('sequelize');
const sequelize = require('../db/db');
const Category = require('./category');

class Department extends Model {}

Department.init(
	{
		department_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
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
	{ sequelize, modelName: 'department', timestamps: false, freezeTableName: true }
);

module.exports = Department;
