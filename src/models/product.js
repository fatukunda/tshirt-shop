const { Model, STRING, INTEGER, TEXT, FLOAT } = require('sequelize');
const Category = require('./category');
const sequelize = require('../db/db');
const Review = require('../models/review');
const ShoppingCart = require('../models/shoppingCart');

class Product extends Model {}
Product.init(
	{
		product_id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: STRING,
		},
		description: {
			type: TEXT,
		},
		price: {
			type: FLOAT,
		},
		discounted_price: {
			type: FLOAT,
		},
		thumbnail: {
			type: STRING,
		},
		image: {
			type: STRING,
		},
		image_2: {
			type: STRING,
		},
	},
	{ sequelize, modelName: 'product', timestamps: false, freezeTableName: true }
);
Product.belongsToMany(Category, { through: 'product_category', timestamps: false, foreignKey: 'product_id' });
Category.belongsToMany(Product, { through: 'product_category', timestamps: false, foreignKey: 'category_id' });
Product.hasMany(Review, { as: 'reviews', foreignKey: 'product_id' });
Product.hasMany(ShoppingCart, { as: 'shopping_cart', foreignKey: 'product_id' });

module.exports = Product;
