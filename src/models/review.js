const { Model, INTEGER, TEXT, SMALLINT, DATE } = require('sequelize');
const sequelize = require('../db/db');
const Customer = require('./customer');

class Review extends Model {}

Review.init(
	{
		review_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		review: {
			allowNull: false,
			type: TEXT,
		},
		rating: {
			type: SMALLINT,
			allowNull: false,
		},
		created_on: {
			allowNull: false,
			type: DATE,
			defaultValue: Date.now(),
		},
	},
	{ sequelize, modelName: 'review', timestamps: false, freezeTableName: true }
);

module.exports = Review;
