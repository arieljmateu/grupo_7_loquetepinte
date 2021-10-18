const fs = require('fs');

const users = fs.readFileSync('src/data/users.json', 'utf-8');
const usersJson = JSON.parse(users).filter(value => JSON.stringify(value) !== '{}');

const controller = {

	login: (req,res) => {
		return res.render('./users/login');
	},
	register: (req,res) => {
		return res.render('./users/register');
	},
	
	registerNew: (req,res) => {
		const newUser = {
			id: usersJson.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
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
	}

}


module.exports = controller