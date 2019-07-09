const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const Customer = require('../models/customer');

const facebookAuth = () => {
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: 'http://localhost:3000/auth/facebook/callback',
				profileFields: ['id', 'email', 'name'],
			},
			async (accessToken, refreshToken, profile, done) => {
				const { email, first_name, last_name } = profile._json;
				let customer = {};
				try {
					customer = await Customer.findOne({
						where: {
							email,
						},
					});
					if (!customer) {
						customer = Customer.build({
							email,
							name: `${first_name} ${last_name}`,
							access_token: accessToken,
						});
						await customer.save();
						return done(null, customer);
					}
					return done(null, customer);
				} catch (error) {
					return done(error);
				}
			}
		)
	);
};

module.exports = facebookAuth;
