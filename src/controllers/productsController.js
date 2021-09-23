const controller = {
    products: (req,res) => {
		return res.render('./products/products');
	},
	createProduct: (req,res) => {
		return res.render('./products/create-product');
	},
}


module.exports = controller