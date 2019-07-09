const express = require('express');
const Op = require('sequelize').Op;
const Product = require('../models/product');
const Category = require('../models/category');
const auth = require('../middleware/auth');
const Review = require('../models/review');

const router = express.Router();

router.get('/products', async (req, res) => {
	// Get a list of all products. Gets the first 20 products if page and limit queries are not specified.
	const limit = parseInt(req.query.limit) || 20;
	const offset = (parseInt(req.query.page) - 1) * limit || 0;
	// const description_length = parseInt(req.query.description_length) || 200;
	const products = await Product.findAndCountAll({ limit, offset });
	res.send(products);
});

router.get('/products/search', async (req, res) => {
	const searchTerm = req.query.query_string;
	const limit = parseInt(req.query.limit) || 20;
	const offset = (parseInt(req.query.page) - 1) * limit || 0;
	try {
		const products = await Product.findAndCountAll({
			where: { name: { [Op.like]: `%${searchTerm}%` } },
			offset,
			limit,
		});
		if (products.rows.length === 0) {
			return res.status(404).send({ message: 'No products matching the search term were found' });
		}
		return res.send(products);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/products/:product_id', async (req, res) => {
	// Get a single product given the product ID
	const product_id = req.params.product_id;

	const product = await Product.findByPk(product_id);
	if (!product) {
		return res.status(404).send({
			error: {
				code: 404,
				message: `Product with an id of ${product_id} was not found.`,
			},
		});
	}
	res.send(product);
});

router.get('/products/incategory/:category_id', async (req, res) => {
	// Get all products in a given category
	const category_id = req.params.category_id;
	const limit = parseInt(req.query.limit) || 20;
	const offset = (parseInt(req.query.page) - 1) * limit || 0;
	let count;
	try {
		const category = await Category.findByPk(category_id);
		if (!category) {
			return res.status(404).send({ error: 'Category not found' });
		}
		const products = await category.getProducts({
			offset,
			limit,
		});
		count = products.length;
		res.send({ count, rows: products });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/products/:product_id/details', async (req, res) => {
	// Get product details
	const product_id = parseInt(req.params.product_id);

	try {
		const product = await Product.findByPk(product_id);
		if (!product) {
			return res.status(404).send({ error: 'Product not found' });
		}
		res.send(product);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/products/:product_id/reviews', async (req, res) => {
	// Get reviews of a specific product
	const product_id = parseInt(req.params.product_id);
	try {
		const product = await Product.findByPk(product_id);
		if (!product) {
			return res.status(404).send({ error: 'Product not found' });
		}
		const productReviews = await product.getReviews();
		res.send(productReviews);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/products/:product_id/reviews', auth, async (req, res) => {
	// Create a review
	const product_id = parseInt(req.params.product_id);

	try {
		const product = await Product.findByPk(product_id);
		if (!product) {
			return res.status(404).send('Product not found');
		}
		const { review, rating } = req.body;
		const customer_id = req.customer.customer_id;
		const customerReview = Review.build({ customer_id, product_id, review, rating });
		await customerReview.save();
		res.status(201).send(customerReview);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
