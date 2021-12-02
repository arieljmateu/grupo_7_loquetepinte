const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const db = require('../database/models');
const User = require('../services/User');


const controller = {

	login: (req, res, next) => {
		return res.render('./users/login');
	},

	doLogin: (req, res, next) => {
		User.findByEmail(req.body.email)
			.then(userToLogin => {
				if (userToLogin &&
					bcrypt.compareSync(req.body.password, userToLogin.hashed_password)
				) {
						delete userToLogin.hashed_password;
						req.session.userLogged = userToLogin;
		
						if (req.body.rememberme) {
							res.cookie('userEmail', req.body.email, {maxAge: ((((1000*60)*60)*24)*365)})
						}
		
						res.redirect("/");
				} else {
					res.render('./users/login', {
						errors: {
							email: {
								msg: 'Las credenciales son invalidas'
							}
						}
					});
				}
			})
			.catch(next); // handled by errorMiddleware
},

	register: (req, res, next) => {
		db.Role.findAll()
			.then(roles => {
				return res.render('./users/register', {roles});
			})
			.catch(next);  // handled by errorMiddleware
	},
	
	registerNew: (req, res, next) => {
		const validations = validationResult(req);

		if (validations.errors.length > 0) {

			return res.render('./users/register', {
				errors: validations.mapped(),
				oldData: req.body
			})
		}

		const userToCreate = {
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			email: req.body.email,
			telephone: req.body.phonenumber,
			address: req.body.address,
			hashed_password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename,
			role_id: 2 // temporaly hardcoded to user
		};

		// we let DB check for duplicate emails
		User.create(userToCreate)
			.then(createdUser => {
				res.redirect('/users/login');
			})
			.catch(errors => {
				if (errors.name === "SequelizeUniqueConstraintError" ) {
					return res.render('./users/register', {
						errors: {
							email: {
								msg: 'Este email ya se encuentra registrado'
							}
						},
						oldData: req.body
					});
				}

				// let errorMiddleware handle this error
				next();
			});
	},

	profile: (req, res) => {
		return res.render('./users/profile');
	},

	update: (req, res) => {
		const validations = validationResult(req);

		if (validations.errors.length > 0) {

			return res.render('./users/profile', {
				errors: validations.mapped(),
				oldData: req.body
			})
		}

		const userToUpdate = {
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			email: req.body.email,
			telephone: req.body.phonenumber,
			address: req.body.address,
			hashed_password: bcrypt.hashSync(req.body.password, 10),
			avatar: req.file.filename,
			role_id: 2 // temporaly hardcoded to user
		};
console.log(userToUpdate);
		// we let DB check for duplicate emails
		User.update(userToUpdate)
			.then(updatedUser => {
				res.redirect('/users/profile');
			})
			.catch(errors => {
				if (errors.name === "SequelizeUniqueConstraintError" ) {
					return res.render('./users/profile', {
						errors: {
							email: {
								msg: 'Este email ya se encuentra registrado'
							}
						},
						oldData: req.body
					});
				}

				// let errorMiddleware handle this error
				next();
			});	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		delete res.locals.userLogged;
		return res.redirect('/');
	}

}


module.exports = controller