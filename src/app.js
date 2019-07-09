const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const taxRoutes = require('./routes/taxRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const stripRoutes = require('./routes/stripeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const orderRoutes = require('./routes/orderRoutes');
require('./middleware/facebookAuth')(passport);

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((customer, done) => {
	done(null, customer);
});
passport.deserializeUser((customer, done) => {
	done(null, customer);
});

app.use(customerRoutes);
app.use(productRoutes);
app.use(shoppingCartRoutes);
app.use(orderRoutes);
app.use(taxRoutes);
app.use(shippingRoutes);
app.use(stripRoutes);
app.use(categoryRoutes);

module.exports = app;
