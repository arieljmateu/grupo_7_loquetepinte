const controller = {

	index: (req,res) => {
		return res.render('index');
	},

    cart: (req,res) => {
		return res.render('cart');
	},

    test: (req,res) => {
		return res.render('test');
	},

}


module.exports = controller