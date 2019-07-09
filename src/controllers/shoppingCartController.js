const Product = require('../models/product');
const ShoppingCart = require('../models/shoppingCart');

const addProductToCart = async requestBody => {
	// Add a product to a shopping cart
	const { product_id, attributes, cart_id, quantity } = requestBody;
	const product = await Product.findByPk(product_id);
	if (!product) {
		throw new Error({
			error: 'No such product was found',
		});
	}
	const shoppingCart = ShoppingCart.build({
		cart_id,
		product_id,
		attributes,
		quantity,
	});
	await shoppingCart.save();
	const cart = {
		item_id: shoppingCart.item_id,
		name: product.name,
		attributes,
		product_id,
		price: product.price,
		quantity,
		image: product.image,
		subtotal: product.price * quantity,
	};
	return cart;
};

const getCartProducts = async shoppingCart => {
	// Get a list of products in a shopping cart
	const cartItems = [];
	await Promise.all(
		shoppingCart.map(async item => {
			let { item_id, attributes, product_id, quantity } = item;
			let product = await getProduct(product_id);
			let { name, price, image } = product;
			const cartItem = {
				item_id,
				name,
				attributes,
				product_id,
				price,
				quantity,
				image,
				subtotal: quantity * price,
			};
			cartItems.push(cartItem);
		})
	);
	return cartItems;
};

const getProduct = async id => {
	const product = await Product.findByPk(id);
	return product;
};

const updateCartByItem = async (quantity, item_id) => {
	// Update quantity of a shopping cart Item
	await ShoppingCart.update({ quantity }, { returning: true, where: { item_id } });
	const cart = await ShoppingCart.findByPk(item_id);
	const product = await Product.findByPk(cart.product_id);
	let { name, image, price } = product;
	let { attributes, product_id } = cart;
	const updatedProduct = {
		item_id,
		name,
		attributes,
		product_id,
		price,
		quantity: cart.quantity,
		image,
		subtotal: price * cart.quantity,
	};
	return updatedProduct;
};

const emptyShoppingCart = async cart_id => {
	// Empty a shopping cart
	await ShoppingCart.destroy({ where: { cart_id } });
	return [];
};

const removeProductFromCart = async item_id => {
	return await ShoppingCart.destroy({ where: { item_id } });
};

const getTotalAmountFromCart = async cart_id => {
	// Get the total amount of all the products in a given shopping cart
	const items = await ShoppingCart.findAll({ where: { cart_id }, attributes: ['quantity', 'product_id'] });
	let subTotal;
	let total_amount = 0;
	await Promise.all(
		items.map(async item => {
			let product = await Product.findByPk(item.product_id, { attributes: ['price'] });
			subTotal = product.price * item.quantity;
			total_amount += subTotal;
		})
	);
	return { total_amount };
};

module.exports = {
	getCartProducts,
	addProductToCart,
	updateCartByItem,
	emptyShoppingCart,
	getTotalAmountFromCart,
	removeProductFromCart,
};
