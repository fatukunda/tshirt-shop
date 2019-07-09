const express = require('express');
const generateuniqueid = require('../utils/generateUniqueId');
const ShoppingCart = require('../models/shoppingCart');
const {
	getCartProducts,
	addProductToCart,
	updateCartByItem,
	emptyShoppingCart,
	getTotalAmountFromCart,
	removeProductFromCart,
} = require('../controllers/shoppingCartController');

const router = express.Router();

router.get('/shoppingcart/generateuniqueid', (req, res) => {
	// Generate a random shopping cart ID
	const cart_id = generateuniqueid();
	res.send({ cart_id });
});

router.post('/shoppingcart/add', async (req, res) => {
	try {
		const response = await addProductToCart(req.body);
		res.send(response);
	} catch (error) {
		res.status(400).send(error.response);
	}
});

router.get('/shoppingcart/:cart_id', async (req, res) => {
	// Get all products in a shopping cart.
	const cart_id = req.params.cart_id;
	try {
		const shoppingCart = await ShoppingCart.findAll({ where: { cart_id } });
		const cartProducts = await getCartProducts(shoppingCart);
		res.send(cartProducts);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/shoppingcart/update/:item_id', async (req, res) => {
	// Update the quantity of a product in a shopping cart
	try {
		const item_id = parseInt(req.params.item_id);
		const quantity = parseInt(req.body.quantity);
		const response = await updateCartByItem(quantity, item_id);
		res.send(response);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/shoppingcart/empty/:cart_id', async (req, res) => {
	// Empty the shopping cart
	try {
		const cart_id = req.params.cart_id;
		const cart = await emptyShoppingCart(cart_id);
		res.send(cart);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/shoppingcart/removeproduct/:item_id', async (req, res) => {
	const item_id = parseInt(req.params.item_id);
	try {
		await removeProductFromCart(item_id);
		res.send();
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/shoppingcart/totalamount/:cart_id', async (req, res) => {
	const cart_id = req.params.cart_id;
	try {
		res.send(await getTotalAmountFromCart(cart_id));
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
