const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const users = fs.readFileSync('src/data/users.json', 'utf-8');
const usersJson = JSON.parse(users).filter(value => JSON.stringify(value) !== '{}');

const controller = {

	login: (req,res) => {
		return res.render('./users/login');
	},

	doLogin: (req, res) => {
		const userToLogin = usersJson.find(user => user.email == req.body.email);

		if (userToLogin) {
			if (bcrypt.compareSync(req.body.password, userToLogin.password)) {
				res.redirect("/");
			}
		} else {
			res.render('./users/login');
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

		const newUser = {
			id: usersJson.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			phonenumber: req.body.phonenumber,
			address: req.body.address,
			category: 'user',
			image: 'default.png'
		}

		usersJson.push(newUser);
		// pretty-print JSON string
		const usersJSON = JSON.stringify(usersJson, null, 2);
		fs.writeFileSync('src/data/users.json', usersJSON);

		res.render('./users/login');
	},

	profile: (req,res) => {
		const userID = req.params.id;
		const user = usersJson.find(user => user.id == userID);
		return res.render('./users/profile', {user: user});
	}

}


module.exports = controller