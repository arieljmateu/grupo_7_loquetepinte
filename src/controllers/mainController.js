const controller = {

	index: (req,res) => {
		return res.render('index');
	},
	
    cart: (req,res) => {
		return res.render('cart');
	},
}


module.exports = controller