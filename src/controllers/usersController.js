
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const User = require('../models/User');


const controller = {

	login: (req,res) => {
		return res.render('./users/login');
	},

	doLogin: (req, res) => {
		const userToLogin = User.findByField('email', req.body.email);

		if (userToLogin &&
			bcrypt.compareSync(req.body.password, userToLogin.password)) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.rememberme) {
					res.cookie('userEmail', req.body.email, {maxAge: ((((1000*60)*60)*24)*365)})
				}

				res.redirect("./profile");
		} else {
			res.render('./users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son invalidas'
					}
				}
			});
		}
},

	register: (req,res) => {
		return res.render('./users/register');
	},
	
	registerNew: (req,res) => {
		const validations = validationResult(req);
        
		if (validations.errors.length > 0) {
			return res.render('./users/register', {
				errors: validations.mapped(),
				oldData: req.body
			})
		}

		let userInDb = User.findByField('email', req.body.email);

		if (userInDb) {
			return res.render('./users/register', {
				errors: {
					email: {
						msg: 'Este email ya se encuentra registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phonenumber: req.body.phonenumber,
			address: req.body.address,
			password: bcrypt.hashSync(req.body.password, 10),
			image: req.file.filename,
			category: 'user' // temporaly hardcoded
		};

		User.create(userToCreate);

		res.redirect('/users/login');
	},

	profile: (req,res) => {
		return res.render('./users/profile');
	},

	logout: (req,res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}

}


module.exports = controller